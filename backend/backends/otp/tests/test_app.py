# coding: utf-8

"""Tests to App OTP Backend"""

from pyotp import TOTP
from pytest import fixture

from backends.otp.app import AppOTPBackend
from backends.otp.base import BaseBackend
from backends.pools import BackendOTPPool


class TestAppOTPBackend:
    @fixture
    def backend(self) -> AppOTPBackend:
        return BackendOTPPool.get("app")

    def test_generate(self, backend):
        auth_uri = backend.generate("testeuser", "teste@teste.com")

        assert auth_uri

    def test_verify_code(self, backend):
        secret = BaseBackend.get_secret("testeuser")
        totp = TOTP(secret)

        verified = backend.verify_code("testeuser", totp.now())

        assert verified
