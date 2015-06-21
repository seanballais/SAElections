from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.contrib.auth.models import User
import hashlib

hashedPasscode = 'deda002bcc2b28921ec34847ee2c0e73ac7e1d164f7d2c4f75531aba8e2ee625'

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

def check_passcode(request): # Authenticates if the user is from PSHS-EVC
    if request.method == 'POST':
        if 'passcode' in request.POST:
            passcode = request.POST['passcode']

            enteredCode = bytes(passcode, 'utf-8')
            userID = request.user.id
            userObj = User.objects.get(id=userID)

            if (hashlib.sha256(enteredCode).hexdigest() == hashedPasscode):
                try:
                    userObj.successful_auth = True

                    userObj.save()
                except User.DoesNotExist:
                    return HttpResponse('failed')

                return HttpResponse('success')

    return HttpResponse('failed')

def confirm_entry(request): # Confirms that the user wants to vote
    userID = request.user.id
    userObj = User.objects.get(id=userID)

    if userObj.successful_auth:
        try:
            userObj.is_pshsevc = True

            userObj.save()
        except User.DoesNotExist:
            return HttpResponseBadRequest

    return HttpResponseRedirect('/')

def save_to_db(request, votes): # Update records in the database
    try:
        userID = request.user.id
        userObj = User.objects.get(id=userID)

        userObj.people_voted = votes
        userObj.has_voted = True

        userObj.save()
    except User.DoesNotExist:
        raise HttpResponseBadRequest

    return HttpResponseRedirect('/')