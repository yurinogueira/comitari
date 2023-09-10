from django.utils.translation import activate

from model_bakery import baker
from pytest import fixture
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


@fixture(autouse=True)
def set_default_language():
    activate("pt-BR")


@fixture(autouse=True)
def test_settings(settings):
    # Set mem cache to test
    # -------------------------------------------------------------------------
    settings.CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "unique-snowflake",
        },
        "sessions": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
            "LOCATION": "unique-snowflake",
        },
    }
    # Set a faster password hasher to test
    # -------------------------------------------------------------------------
    settings.PASSWORD_HASHERS = [
        "django.contrib.auth.hashers.MD5PasswordHasher",
    ]


@fixture
def user():
    return baker.make_recipe("users.tests.user")


@fixture
def access_token(user):
    refresh = RefreshToken.for_user(user)
    if isinstance(refresh, RefreshToken):
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


@fixture
def api_client(access_token):
    token = access_token.get("access")
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    return client
