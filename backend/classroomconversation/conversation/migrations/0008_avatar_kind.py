# Generated by Django 4.0.3 on 2022-12-30 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conversation', '0007_avatar'),
    ]

    operations = [
        migrations.AddField(
            model_name='avatar',
            name='kind',
            field=models.CharField(choices=[('teacher', 'teacher'), ('student', 'student')], default='teacher', max_length=48),
        ),
    ]
