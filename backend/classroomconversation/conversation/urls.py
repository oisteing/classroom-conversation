from django.urls import path, include
from rest_framework import routers

from . import views


router = routers.SimpleRouter(trailing_slash=False)
router.register(
    r"document", views.ConversationDetailAPIView,
)
router.register(
    r"completed", views.CompletedConversationDetailAPIView,
)
router.register(
    r"submit", views.CompletedConversationCreateAPIView
)

urlpatterns = [
    path("api/", include(router.urls)),
    path("conversations", views.get_all_conversations, name="conversations"),
    path("conversations/add", views.add_conversation, name="conversations_add"),
    path("conversations/<uuid>/edit", views.edit_conversation_by_id, name="conversation_edit_by_id"),
    path("conversations/<uuid>", views.get_conversation_by_id, name="conversations_get_by_id"),
    path("illustrations", views.get_all_illustrations, name="illustrations"),
    path("illustrations/add", views.add_illustration, name="illustrations_add"),
    path("illustrations/<uuid>/edit", views.edit_illustration_by_id, name="illustration_edit_by_id"),
    path("illustration/<image_name>", views.get_illustration_by_name, name="illustrations_get_by_name"),
    path("avatars", views.get_all_avatars, name="avatars"),
    path("avatars/add", views.add_avatar, name="avatars_add"),
    path("avatars/<uuid>/edit", views.edit_avatar_by_id, name="avatars_edit_by_id"),
    path("avatar/<image_name>", views.get_avatar_by_name, name="avatars_get_by_name"),
    path("avatars/<kind>", views.get_avatar_names_by_kind, name="avatars_get_name_by_kind"),
    path("metrics", views.metrics_overview, name="metrics_overview"),
    path("metrics/<uuid>", views.metrics_view, name="metrics_view"),
    path("metrics/<uuid>/export", views.metrics_export, name="metrics_export"),
    path("metrics/<uuid>/delete", views.metrics_delete, name="metrics_delete")
]
