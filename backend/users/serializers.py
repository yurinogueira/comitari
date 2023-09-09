from rest_framework import serializers

from users.models import User


class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    password = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        read_only_fields = ("username", "date_joined")
        exclude = (
            "id",
            "password",
            "is_staff",
            "is_active",
            "is_superuser",
            "last_login",
            "user_permissions",
            "groups",
        )
