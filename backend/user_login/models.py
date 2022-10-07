from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('El usuario debe tener correo electronico')

        usuario = self.model(
            username=username, 
            email=self.normalize_email(email)
        )
        
        usuario.set_password(password)
        usuario.save()
        return usuario

    def create_superuser(self, email, username, password):
        usuario = self.create_user(
            email,
            username=username,
            password=password
        )
        
        usuario.usuario_adminstrador = True
        usuario.save()
        return usuario

class Usuario(AbstractBaseUser):
    username= models.CharField('Nombre de Usuario', unique=True, max_length=100)
    email = models.EmailField('Correo Electronico', max_length=254, unique=True)
    is_active = models.BooleanField(default=True)
    usuario_administrador = models.BooleanField(default=False)
    objects = UsuarioManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    def __str__(self):
        return f'Usuario {self.username}'
    
    def has_perm(self,perm,obj = None):
        return True
    
    def has_module_perms(self, app_label):
        return True
    
    @property
    def is_staff(self):
        return self.usuario_administrador

# En setting.py 
#   AUTH_USER_MODEL = 'user_login.Usuario'