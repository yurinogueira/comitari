from django.db.models import FileField, DateTimeField, Model

from core.storages import PublicMediaStorage, PrivateMediaStorage


class Upload(Model):
    uploaded_at = DateTimeField(auto_now_add=True)
    file = FileField(storage=PublicMediaStorage())

    def build_url(self) -> str:
        self.save()
        return self.file.url


class UploadPrivate(Model):
    uploaded_at = DateTimeField(auto_now_add=True)
    file = FileField(storage=PrivateMediaStorage())

    def build_url(self) -> str:
        self.save()
        return self.file.url
