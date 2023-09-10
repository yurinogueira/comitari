# coding: utf-8

"""Tests to Cache OTP Backend"""

from django.conf import settings
from django.core.cache import cache

from pytest import fixture

from backends.otp.cache import CacheOTPBackend
from backends.pools import BackendOTPPool


class TestCacheOTPBackend:
    @fixture
    def backend(self) -> CacheOTPBackend:
        return BackendOTPPool.get("cache")

    def test_generate(self, backend):
        code = backend.generate("testeuser", "teste@teste.com")

        assert code

    def test_verify_code(self, backend):
        source = "teste"
        code = "123987"

        cache.set(f"otp-code-{source}", code, settings.OTP_CODE_CACHE_TLL)

        verified = backend.verify_code(source, code)

        assert verified
