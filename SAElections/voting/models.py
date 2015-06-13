from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    """ 
    People not voted will be calculated through
    the following formula:

    Va = Nv - Vp

    where:
        Va - votes against the candidate
        Nv - total number of voters
        Vp - votes supporting the candidate

    """
    people_voted = models.CharField(max_length=128)
    user_has_voted = models.BooleanField(default=False)
    user = models.ForeignKey(User, unique=False)