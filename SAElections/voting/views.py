from django.http import HttpResponseBadRequest, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.contrib.auth.models import User

def home(request):
    return render_to_response(
        'home.html',
        RequestContext(
            request,
            {
                'request': request,
                'user': request.user
            }
        )
    )

def auth_successful(self): # Reloads the home page to access the voting area or thank you page
    return render_to_response('auth-successful.html')

def save_to_db(request, votes): # Update records in the database
    try:
        userID = request.user.id # Poor cast off
        
        userObj = User.objects.get(id=userID)
        userObj.people_voted = votes
        userObj.has_voted = True

        userObj.save()
    except User.DoesNotExist:
        raise HttpResponseBadRequest

    return HttpResponseRedirect('/') # Return to the home page