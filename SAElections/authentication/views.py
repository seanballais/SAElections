from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

def auth_check(username, password):
    user = authenticate(username = username, password = password)
    # Check if the user exists
    if user is not None:
        # The user exists
        return True

    return False

def user_auth(request): # Authenticates if the user entered the a valid student ID number
    if request.method == 'POST' and 'studentID' in request.POST and 'password' in request.POST:
        studentID = request.POST.get('studentID', None)
        password = request.POST.get('password', None)
        
        if auth_check(studentID, password):
            return HttpResponse('success')
        else:
            return HttpResponse('failed')

    return HttpResponse('failed') # Show an 403 page

def user_login(request):
    # Authenticate again just to be sure
    studentID = request.POST['studentID']
    password = request.POST['password']
    user = authenticate(username = studentID, password = password)

    if auth_check(studentID, password) and user is not None:
        login(request, user)

    return HttpResponseRedirect('/')

def user_logout(request):
    logout(request)

    return HttpResponseRedirect('/')