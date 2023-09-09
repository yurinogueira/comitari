import jwt
from django.conf import settings
from django.utils.text import slugify
from rest_framework.mixins import (
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from users.models import User
from users.serializers import (
    UserSerializer,
    RegisterSerializer,
    ResetPasswordSerializer,
)


class RegisterAPIView(APIView):
    serializer_class = RegisterSerializer
    permission_classes: list[str] = []
    authentication_classes: list[str] = []

    def get_serializer(self, *args, **kwargs) -> RegisterSerializer:
        return self.serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.data

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        password = request.data.get("password")

        # Create the user
        # --------------------------------------------------------------------
        user = User.objects.create(
            username=slugify(email),
            email=email.lower(),
            first_name=first_name.capitalize(),
            last_name=last_name.capitalize(),
        )

        # set password
        # --------------------------------------------------------------------
        user.set_password(password)
        user.save(update_fields=["password"])

        # Return user to UI
        # --------------------------------------------------------------------
        return Response(data, status=status.HTTP_201_CREATED)


class ResetPasswordAPIView(APIView):
    serializer_class = ResetPasswordSerializer
    authentication_classes: list[str] = []
    permission_classes: list[str] = []

    def get_serializer(self, *args, **kwargs):
        return self.serializer_class(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.data

        token = data.get("token")
        password = data.get("password")

        secret = settings.SECRET_KEY
        algorithm = settings.SIMPLE_JWT["ALGORITHM"]

        try:
            decoded = jwt.decode(token, secret, algorithm)
            email = decoded.get("email")

            user = User.objects.get(email=email)
        except jwt.InvalidTokenError:
            return Response({"message": "Token inválido"}, status.HTTP_400_BAD_REQUEST)

        user.set_password(password)
        user.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(
    RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "username"
    lookup_value_regex = "[\\w.@+-]+"
    http_method_names = ["get", "patch", "delete"]

    def get_queryset(self):
        queryset = super().get_queryset()

        return queryset.filter(id=self.request.user.id)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save(update_fields=["is_active"])

        return Response(status=status.HTTP_204_NO_CONTENT)
