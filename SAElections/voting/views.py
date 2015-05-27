from django.shortcuts import render_to_response
from django.template.context import RequestContext

def home(request):
    return render_to_response(
        'home.html',
        { 'add_custom_css': 'true', 'add_custom_js': 'true' },
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
