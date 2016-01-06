from django.http import HttpResponseRedirect
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.contrib.auth.models import User

def direct(request): # The homepage
    user = request.user
    if user.is_authenticated() and not user.has_voted:
        return render_to_response('vote.html', RequestContext(request))
    elif user.is_authenticated() and user.has_voted:
        return render_to_response('thank-you.html', RequestContext(request))

    return render_to_response('login.html', RequestContext(request))