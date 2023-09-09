from django.utils.translation import activate

from model_bakery import baker
import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken


@pytest.fixture(autouse=True)
def set_default_language():
    activate("pt-BR")


@pytest.fixture(autouse=True)
def use_dummy_cache_backend(settings):
    settings.CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.dummy.DummyCache",
        },
        "sessions": {
            "BACKEND": "django.core.cache.backends.dummy.DummyCache",
        },
    }


@pytest.fixture
def user():
    return baker.make_recipe("users.tests.user")


@pytest.fixture
def access_token(user):
    refresh = RefreshToken.for_user(user)
    if isinstance(refresh, RefreshToken):
        return {"refresh": str(refresh), "access": str(refresh.access_token)}


@pytest.fixture
def api_client(access_token):
    token = access_token.get("access")
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    return client
