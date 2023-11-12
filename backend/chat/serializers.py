from rest_framework.serializers import ModelSerializer

from chat.models import Message


class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = ("id", "has_edit", "author", "content", "timestamp")
        read_only_fields = ("id", "has_edit", "author", "timestamp")
