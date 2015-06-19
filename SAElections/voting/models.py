from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    User.add_to_class('people_voted', models.CharField(max_length=128, default=''))
    User.add_to_class('has_voted', models.BooleanField(default=False))
    User.add_to_class('is_pshsevc', models.BooleanField(default=False))
    User.add_to_class('successful_auth', models.BooleanField(default=False))

    user = models.ForeignKey(User, unique=False)