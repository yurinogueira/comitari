from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from backends.otp.base import BaseBackend
from backends.pools import BackendOTPPool
from users.choices import TWO_FACTOR_CHOICES
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
            "is_superuser",
            "last_login",
            "user_permissions",
            "groups",
        )


class JWTSerializer(TokenObtainPairSerializer):
    email = serializers.CharField()
    password = serializers.CharField()
    selected_method = serializers.ChoiceField(
        required=False, choices=TWO_FACTOR_CHOICES
    )
    code = serializers.CharField(required=False)

    def validate(self, attrs):
        value = attrs.get(self.username_field).lower()
        code = attrs.get("code")

        credentials = {"email": value, "password": attrs.get("password")}

        if not all(credentials.values()):
            raise serializers.ValidationError("Informe e-mail e senha!")

        try:
            user = User.objects.get(**{"email": value})
        except User.DoesNotExist:
            raise serializers.ValidationError(
                "Erro ao efetuar login! Verifique os dados informados e tente "
                "novamente."
            )

        auth_user = user.check_password(credentials["password"])
        if not auth_user:
            raise serializers.ValidationError(
                "Erro ao efetuar login! Verifique os dados informados e tente "
                "novamente."
            )

        if user.two_factor and not code:
            raise serializers.ValidationError(
                "Esta conta possui autenticação de 2-Fatores ativo."
            )

        attrs["email"] = user.email
        data = super().validate(attrs)
        result = {
            "token": data["access"],
            "refresh": data["refresh"],
            "username": user.username,
        }

        if user.two_factor:
            backend_id: str = attrs.get("selected_method")
            backend: BaseBackend = BackendOTPPool.get(backend_id)

            if not backend.verify_code(user.username, code):
                raise serializers.ValidationError("Código inválido.")

        return result
