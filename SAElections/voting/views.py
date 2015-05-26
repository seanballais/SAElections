from django.shortcuts import render_to_response
from django.template.context import RequestContext

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

def auth_successful(self):
    return render_to_response('auth-successful.html')
