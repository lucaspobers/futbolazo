from rest_framework import serializers
from user_login.models import Usuario


class UserTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('username', 'email')