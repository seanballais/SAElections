from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth.admin import UserAdmin
from django.contrib import admin
from django import forms

class VoterCreationForm(UserCreationForm):
    section = forms.CharField()

    def save(self, commit=True):
        user = super(VoterCreationForm, self).save(commit=False)
        user.section = self.cleaned_data['section']
        if commit:
            user.save()
        return user

    class Meta:
        model = User
        fields = ('username', 'password1', 'password2', 'section', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')

class VoterChangeForm(UserChangeForm):
    section = forms.CharField()

    def save(self, commit=True):
        user = super(VoterChangeForm, self).save(commit=False)
        user.section = self.cleaned_data['section']
        if commit:
            user.save()
        return user

    class Meta:
        model = User
        exclude = ('',)

class VoterAdmin(UserAdmin):
    form = VoterChangeForm
    add_form = VoterCreationForm
    list_filter = UserAdmin.list_filter + ('section',)

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (('Personal info'), {'fields': ('first_name', 'last_name', 'section')}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'section', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')}
        ),
    )

admin.site.unregister(User)
admin.site.register(User, VoterAdmin)