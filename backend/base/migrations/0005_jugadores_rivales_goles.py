# Generated by Django 4.0.1 on 2023-04-21 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_jugadores_rivales'),
    ]

    operations = [
        migrations.AddField(
            model_name='jugadores_rivales',
            name='goles',
            field=models.IntegerField(default=0, verbose_name='Goles'),
        ),
    ]