from django.contrib import admin

# Register your models here.

from .models import Avatar, Conversation, Illustration, CompletedConversation

admin.site.register(Avatar)
admin.site.register(Conversation)
admin.site.register(Illustration)
admin.site.register(CompletedConversation)
