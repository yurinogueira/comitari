from django.db import models


class Message(models.Model):
    content = models.TextField(max_length=255)
    has_edit = models.BooleanField(default=False)

    timestamp = models.DateTimeField(auto_now_add=True)

    author = models.ForeignKey(
        "users.User", related_name="send_messages", on_delete=models.CASCADE
    )

    def __str__(self):
        return self.content
