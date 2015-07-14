"""SAElections URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

admin.autodiscover()

urlpatterns = [
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^login/$', 'django.contrib.auth.views.login'),
    url(r'^$', 'login.views.home', name='home'),
    url(r'^/$', 'login.views.home', name='home'),
    url(r'^redirect/$', 'login.views.redirect', name='redirect'),
    url(r'^authenticate/$', 'login.views.authenticate', name='authenticate'),
    url(r'^save-votes/(?P<votes>.+)/$', 'voting.views.save_votes', name='save-votes'),
    url(r'^thank-you/$', 'voting.views.thank_you', name='thank-you'),
    url(r'^admin/', include(admin.site.urls)),
] + staticfiles_urlpatterns()
