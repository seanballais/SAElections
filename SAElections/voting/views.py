from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

def save_votes(request, votes): # Update records in the database
    try:
        userID = request.user.id
        userObj = User.objects.get(id=userID)

        userObj.people_voted = votes
        userObj.has_voted = True

        userObj.save()
    except User.DoesNotExist:
        raise HttpResponseBadRequest # Show a 403 page

    return HttpResponseRedirect('/')