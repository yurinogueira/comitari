from drf_spectacular.utils import extend_schema, OpenApiParameter
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.viewsets import ModelViewSet

from chat.models import Message
from chat.serializers import MessageSerializer


class MessageViewSet(ModelViewSet):
    MAX_MESSAGES = 50

    serializer_class = MessageSerializer
    queryset = Message.objects.select_related("author").order_by("timestamp").all()
    http_method_names = ["get", "patch", "post"]
    paginator = None

    def get_queryset(self):
        return super().get_queryset()[: self.MAX_MESSAGES]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid(raise_exception=True):
            serializer.save(author=request.user)

        return Response(serializer.data)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        return Response(serializer.data)

    @extend_schema(
        parameters=[
            OpenApiParameter(
                name="id",
                location=OpenApiParameter.PATH,
                description="List messages after some message",
                required=True,
                type=int,
            )
        ],
        responses=MessageSerializer(many=True),
    )
    @action(
        detail=False,
        methods=["get"],
        url_path="(?P<id>[^/.]+)/messages",
    )  # noqa
    def list_after(self, request):
        identifier = self.kwargs.get("id")
        if identifier is None:
            return Response(
                {"detail": "Identifier not provided."},
                status=HTTP_400_BAD_REQUEST,
            )

        queryset = self.get_queryset()

        try:
            message = queryset.get(pk=identifier)
            result = queryset.filter(timestamp__gt=message.timestamp)
        except Message.DoesNotExist:
            result = queryset

        serializer = self.get_serializer(result, many=True)

        return Response(serializer.data)
