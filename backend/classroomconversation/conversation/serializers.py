from rest_framework import serializers

from .models import Avatar, Conversation, Illustration, CompletedConversation


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = [
            "name",
            "description",
            "json",
            "document",
            "created",
            "updated",
            "uuid",
        ]


class IllustrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Illustration
        fields = [
            "name",
            "description",
            "image",
            "created",
            "updated",
            "uuid"
        ]


class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avatar
        fields = [
            "name",
            "description",
            "selectable",
            "kind",
            "image",
            "created",
            "updated",
            "uuid"
        ]


class CompletedConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedConversation
        fields = [
            "conversation",
            "choices",
            "created",
            "updated",
            "uuid"
        ]
