from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.contrib.auth.models import User

from time import strftime

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

def authentication(request): # Authenticates if the user entered the a valid student ID number
    if request.method == 'POST':
        if 'studentID' in request.POST and 'password' in request.POST:
            studentID = request.POST['studentID']
            password = request.POST['password']

            # Check if Student ID exists
            userCount = User.objects.filter(student_id = studentID)
            if (userCount != 0 and userCount == 1): # Student ID Number exists
                try:
                    userObj = User.objects.get(student_id = studentID)

                    if (userObj.password == password):
                        userObj.successful_auth = True
                        userObj.last_login = strftime('%Y-%m-%d %H:%M:%S')
                        userObj.save()
                    else:
                        return HttpResponse('success')
                except User.DoesNotExist:
                    return HttpResponse('failed')
            else:
                return HttpResponse('failed')
    return HttpResponse('failed')

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