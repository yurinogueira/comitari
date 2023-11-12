"""
URL configuration for comitari project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from users.serializers import JWTSerializer

# Open API
schema = SpectacularAPIView.as_view()
swagger = SpectacularSwaggerView.as_view(url_name="schema")

# SimpleJWT
token_obtain = TokenObtainPairView.as_view(serializer_class=JWTSerializer)
token_refresh = TokenRefreshView.as_view()
token_verify = TokenVerifyView.as_view()

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    # SimpleJWT
    path("api/token/", token_obtain, name="token_obtain_pair"),
    path("api/token/refresh/", token_refresh, name="token_refresh"),
    path("api/token/verify/", token_verify, name="token_verify"),
    # User
    path("users/", include(("users.urls", "users")), name="users"),
    # Chat
    path("chat/", include(("chat.urls", "chat")), name="chat"),
    # Open API
    path("schema/", schema, name="schema"),
    path("schema/docs/", swagger, name="swagger-ui"),
]

admin.site.site_header = "NGRTec"
admin.site.index_title = "Comitari"
admin.site.site_title = "NGRTec | Comitari"
