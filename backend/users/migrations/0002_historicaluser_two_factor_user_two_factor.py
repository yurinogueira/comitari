# Generated by Django 4.2.5 on 2023-09-10 15:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='historicaluser',
            name='two_factor',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='two_factor',
            field=models.BooleanField(default=False),
        ),
    ]
