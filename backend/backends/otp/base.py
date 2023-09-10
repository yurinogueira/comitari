import base64
from abc import ABC

from django.conf import settings


class BaseBackend(ABC):
    @classmethod
    def get_secret(cls, source: str) -> str:
        secret: str = source + settings.SECRET_KEY
        secret = base64.b32encode(secret.encode("utf-8")).decode("utf-8")
        secret = secret[0:12] + secret[48:56] + secret[12:24]

        return secret

    def generate(self, source: str, receiver: str) -> str:  # pragma: no cover
        ...

    def verify_code(self, source: str, code: str) -> bool:  # pragma: no cover
        ...
