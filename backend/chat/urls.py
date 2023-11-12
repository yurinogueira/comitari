from django.urls import path, include
from rest_framework.routers import DefaultRouter

from chat.views import MessageViewSet

router = DefaultRouter()
router.register("messages", MessageViewSet, "messages")

urlpatterns = [
    path("", include(router.urls)),
]
