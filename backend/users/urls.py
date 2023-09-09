from django.urls import path, include
from rest_framework.routers import DefaultRouter

from users.views import RegisterAPIView, ResetPasswordAPIView, UserViewSet


router = DefaultRouter()
router.register("users", UserViewSet, "users")

urlpatterns = [
    path("", include(router.urls)),
    path("register", RegisterAPIView.as_view(), name="register"),
    path("password/reset", ResetPasswordAPIView.as_view(), name="reset"),
]
