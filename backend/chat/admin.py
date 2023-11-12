from django.contrib import admin

from chat.models import Message


class MessageAdmin(admin.ModelAdmin):
    list_display = ("author", "content", "timestamp")


admin.site.register(Message, MessageAdmin)
