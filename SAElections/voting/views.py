from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

def home():
    return render_to_response('home.html')

@login_required
def vote():
    return render_to_response('vote.html')

@login_required
def thank_you():
    return render_to_response('thank-you.html')

def save_votes(request, votes): # Update records in the database
    try:
        userID = request.user.id
        userObj = User.objects.get(id=userID)

        userObj.people_voted = votes
        userObj.has_voted = True

        userObj.save()
    except User.DoesNotExist:
        raise HttpResponseBadRequest

    return HttpResponseRedirect('/')