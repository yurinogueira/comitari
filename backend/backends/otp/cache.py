from django.conf import settings
from django.core.cache import cache
from pyotp import TOTP

from ramos.mixins import SingletonCreateMixin

from backends.otp.base import BaseBackend


class CacheOTPBackend(SingletonCreateMixin, BaseBackend):
    id = "cache"

    def __init__(self):
        self.cache_prefix = "otp-code-"

    def generate(self, source: str, receiver: str) -> str:
        secret = self.get_secret(source)
        totp = TOTP(secret)
        code = totp.now()

        cache.set(f"{self.cache_prefix}{source}", code, settings.OTP_CODE_CACHE_TLL)

        return code

    def verify_code(self, source: str, code: str) -> bool:
        cached_code = cache.get(f"{self.cache_prefix}{source}")

        return cached_code == code
