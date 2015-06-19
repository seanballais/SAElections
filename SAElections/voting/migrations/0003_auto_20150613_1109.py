# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('voting', '0002_userprofile_user_has_voted'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='people_voted',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='user_has_voted',
        ),
    ]
