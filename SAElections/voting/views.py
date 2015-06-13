from django.shortcuts import render_to_response
from django.template.context import RequestContext
from voting.models import UserProfile

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
    user = UserProfile(people_voted=votes, has_voted=True)
    user.save()