from django.urls import path
from user_login.views import Login

urlpatterns = [
    path('login2/', Login.as_view(), name='login'),
]
