from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from voting.models import UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = True

# Define a new UserAdmin
class UserAdmin(UserAdmin):
    inlines = (UserProfileInline, )

# Register the new admin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)