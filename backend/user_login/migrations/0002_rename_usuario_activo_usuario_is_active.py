# Generated by Django 4.0.1 on 2022-07-25 22:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_login', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usuario',
            old_name='usuario_activo',
            new_name='is_active',
        ),
    ]
