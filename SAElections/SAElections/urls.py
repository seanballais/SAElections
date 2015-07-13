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
    url(r'^$', 'voting.views.home', name='home'),
    url(r'^auth-successful/', 'voting.views.auth_successful', name='auth-successful'),
    url(r'^authentication/$', 'voting.views.check_studentID', name='check-studentID'),
    url(r'^confirm/$', 'voting.views.confirm_entry', name='confirm-entry'),
    url(r'^save-votes/(?P<votes>.+)/$', 'voting.views.save_to_db', name='save-to-db'),
    url(r'^admin/', include(admin.site.urls)),
] + staticfiles_urlpatterns()
