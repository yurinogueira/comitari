from rest_framework.serializers import ModelSerializer

from chat.models import Message
from users.serializers import UserSerializer


class MessageSerializer(ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ("id", "has_edit", "author", "content", "timestamp")
        read_only_fields = ("id", "has_edit", "author", "timestamp")
