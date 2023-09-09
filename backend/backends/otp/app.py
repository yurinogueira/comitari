from pyotp import TOTP
from ramos.mixins import SingletonCreateMixin

from backends.otp.base import BaseBackend


class AppOTPBackend(SingletonCreateMixin, BaseBackend):
    id = "app"

    def generate(self, source: str, receiver: str) -> str:
        secret = self.get_secret(source)
        totp = TOTP(secret)
        uri = totp.provisioning_uri(name=receiver, issuer_name="Comitari")

        return uri

    def verify_code(self, source: str, code: str) -> bool:
        secret = self.get_secret(source)
        totp = TOTP(secret)
        verified = totp.verify(code)

        return verified
