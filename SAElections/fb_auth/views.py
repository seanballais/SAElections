from django.shortcuts import render_to_response
from django.template.context import RequestContext

def home(request):
    return render_to_response(
            'fb_auth/home.html',
            RequestContext(
                request,
                {
                    'user': request.user
                }
            )
        )