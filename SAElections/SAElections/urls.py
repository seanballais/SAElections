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
    url(r'^$', 'director.views.direct', name='home'), # The voting/thank you page is here
    url(r'^/$', 'director.views.direct', name='home'), # and also here
    url(r'^login/$', 'authentication.views.user_login', name='login'),
    url(r'^logout/$', 'authentication.views.user_logout', name='logout'),
    url(r'^authenticate/$', 'authentication.views.user_auth', name='authenticate'),
    url(r'^save-votes/(?P<votes>.+)/$', 'voting.views.save_votes', name='save-votes'),
    url(r'^admin/', include(admin.site.urls)),
] + staticfiles_urlpatterns()
