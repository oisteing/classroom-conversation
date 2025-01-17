import uuid
from datetime import datetime
import csv

from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework import viewsets, mixins

from django.shortcuts import render, redirect
from django.core.files import File
from django.http import FileResponse, HttpResponseNotFound, HttpResponse, HttpResponseServerError, HttpResponseBadRequest, JsonResponse
from django.utils.translation import gettext_lazy as _

from django.contrib.auth.decorators import login_required, permission_required

from .forms import AvatarForm, ConversationForm, IllustrationForm
from .models import Avatar, Conversation, Illustration, CompletedConversation
from .serializers import AvatarSerializer, ConversationSerializer, IllustrationSerializer, CompletedConversationSerializer
from .parser import graphml_to_json
from .helpers import generate_heatmap_html, completed_conversation_to_csv

LOGIN_URL = "/account/login/"


### API ###
class ConversationDetailAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = [AllowAny]
    lookup_field = "uuid"


class IllustrationDetailAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Illustration.objects.all()
    serializer_class = IllustrationSerializer
    permission_classes = [AllowAny]
    lookup_field = "uuid"


class AvatarDetailAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = Avatar.objects.all()
    serializer_class = AvatarSerializer
    permission_classes = [AllowAny]
    lookup_field = "uuid"


class CompletedConversationDetailAPIView(viewsets.ReadOnlyModelViewSet):
    queryset = CompletedConversation.objects.all()
    serializer_class = CompletedConversationSerializer
    permission_classes = [IsAdminUser]
    lookup_field = "uuid"


class CompletedConversationCreateAPIView(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = CompletedConversation.objects.all()
    serializer_class = CompletedConversationSerializer
    permission_classes = [AllowAny]
    lookup_field = "uuid"


### VIEWS ###
@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def add_conversation(request):
    if request.method == "POST":
        form = ConversationForm(request.POST, request.FILES)

        if form.is_valid():
            conversation = form.save(commit=False)
            conversation.uuid = str(uuid.uuid4())
            conversation.json, conversation.errors = graphml_to_json(
                File(conversation.document), conversation.uniform_probability
            )
            conversation.save()
            return redirect("conversations")
        else:
            # TODO: pass errors
            return render(request, "upload_document.html", {"form": form})

    form = ConversationForm()
    return render(request, "upload_document.html", {"form": form})


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def get_all_conversations(request):
    if request.method == "GET":
        conversations = Conversation.objects.all().order_by("-created")
        return render(request, "conversation_list.html", {"conversations": conversations})

    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def get_conversation_by_id(request, uuid):
    conversation = Conversation.objects.filter(uuid=uuid)
    if conversation.count() == 1:
        document = conversation.first().document
        return FileResponse(document)

    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def edit_conversation_by_id(request, uuid):
    if request.method in ["GET", "POST"]:
        message = None
        try:
            conversation = Conversation.objects.filter(uuid=uuid).first()
            form = ConversationForm(instance=conversation)
            if request.method == "GET":
                return render(request, "upload_document.html", {"form": form})
            if request.method == "POST":
                form = ConversationForm(request.POST, request.FILES, instance=conversation)

                if form.is_valid():
                    conversation = form.save(commit=False)
                    if "document" in form.changed_data or "uniform_probability" in form.changed_data:
                        conversation.json, conversation.errors = graphml_to_json(
                            File(conversation.document), conversation.uniform_probability
                        )
                    conversation.save()
                    message = _("form.response.document_updated")
                    
                return render(request, "upload_document.html", {"form": form, "message": message})
        except:
            pass
    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def add_illustration(request):
    if request.method == "POST":
        form = IllustrationForm(request.POST, request.FILES)

        try:
            illustration = form.save(commit=False)
            illustration.uuid = str(uuid.uuid4())
            illustration.image = File(illustration.image)
            illustration.save()
            return redirect("illustrations")
        except Exception as error:
            print(error)
            # TODO: Identify proper error responses
            raise ValueError("An error occured while uploading the file")
        
    form = IllustrationForm()
    return render(request, "upload_document.html", {"form": form})


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def get_all_illustrations(request):
    if request.method == "GET":
        illustrations = Illustration.objects.all().order_by("-created")
        return render(request, "illustration_list.html", {"illustrations": illustrations})
    
    return render(request, "404.html")


def get_illustration_by_name(request, image_name):
    if request.method == "GET":
        illustration = Illustration.objects.filter(name=image_name)
        if illustration.count() == 1:
            image = illustration.first().image
            return FileResponse(image)
    
    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def edit_illustration_by_id(request, uuid):
    if request.method in ["GET", "POST"]:
        message = None
        try:
            illustration = Illustration.objects.filter(uuid=uuid).first()
            form = IllustrationForm(instance=illustration)
            if request.method == "GET":
                return render(request, "upload_document.html", {"form": form})
            if request.method == "POST":
                form = IllustrationForm(request.POST, request.FILES, instance=illustration)

                if form.is_valid():
                    illustration = form.save(commit=False)
                    illustration.save()
                    message = _("form.response.document_updated")
                    
                return render(request, "upload_document.html", {"form": form, "message": message})
        except:
            pass
    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def add_avatar(request):
    if request.method == "POST":
        form = AvatarForm(request.POST, request.FILES)

        try:
            avatar = form.save(commit=False)
            avatar.uuid = str(uuid.uuid4())
            avatar.image = File(avatar.image)
            avatar.save()
            return redirect("avatars")
        except Exception as error:
            print(error)
            raise ValueError("An error occurred while uploading the file")

    form = AvatarForm()
    return render(request, "upload_document.html", {"form": form})


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def get_all_avatars(request):
    if request.method == "GET":
        avatars = Avatar.objects.all().order_by("-created")
        return render(request, "avatar_list.html", {"avatars": avatars})

    return render(request, "404.html")


def get_avatar_by_name(request, image_name):
    if request.method == "GET":
        avatar = Avatar.objects.filter(name=image_name)
        if avatar.count() == 1:
            image = avatar.first().image
            return FileResponse(image)
        
    return render(request, "404.html")


def get_avatar_names_by_kind(request, kind):
    if request.method == "GET":
        if kind not in ["teacher", "student"]:
            return HttpResponseBadRequest("Invalid value for 'kind'", kind)

        avatars = Avatar.objects.filter(kind=kind, selectable=True)
        return JsonResponse({kind: [avatar.name for avatar in avatars]})

    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def edit_avatar_by_id(request, uuid):
    if request.method in ["GET", "POST"]:
        message = None
        try:
            avatar = Avatar.objects.filter(uuid=uuid).first()
            form = AvatarForm(instance=avatar)
            if request.method == "GET":
                return render(request, "upload_document.html", {"form": form})
            if request.method == "POST":
                form = AvatarForm(request.POST, request.FILES, instance=avatar)

                if form.is_valid():
                    avatar = form.save(commit=False)
                    avatar.save()
                    message = _("form.response.document_updated")
                    
                return render(request, "upload_document.html", {"form": form, "message": message})
        except:
            pass
    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def metrics_overview(request):
    conversations = Conversation.objects.all().order_by("-created")
    return render(request, "metrics_overview.html", {"conversations": conversations})


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def metrics_view(request, uuid):
    if request.method == "GET":
        conversation = Conversation.objects.filter(uuid=uuid)
        if conversation.count() >= 1:
            conversation_name = conversation.first().name
            completed_conversations = CompletedConversation.objects.filter(conversation=uuid).order_by("-created")
            heatmap = generate_heatmap_html(completed_conversations)
            table_headers = [_("table.label.date")]
            # find the longest conversation
            if completed_conversations.count() >= 1:
                max_len = max([len(conversation.choices) for conversation in completed_conversations])
                completed_conversations = [cc for cc in completed_conversations if len(cc.choices) > 0]
                localized_choice_str = _('table.label.choice')
                table_headers.extend([f"{localized_choice_str} {i + 1}" for i in range(0, max_len)])

            return render(request, "metrics_view.html", {"conversation_name": conversation_name, "completed_conversations": completed_conversations, "table_headers": table_headers, "heatmap": heatmap})
    
    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def metrics_export(request, uuid):
    if request.method == "GET":
        try:
            conversation_name = Conversation.objects.filter(uuid=uuid).first().name
        except:
            # in the event that the conversastion has been deleted
            conversation_name = uuid
        completed_conversations = CompletedConversation.objects.filter(conversation=uuid).order_by("-created")
        completed_conversations = [cc for cc in completed_conversations if len(cc.choices) > 0]
        now = datetime.now().isoformat()
        data = completed_conversation_to_csv(completed_conversations)
        filename = f"export_metrics_{conversation_name}-{uuid}_{now}.csv"
        response = HttpResponse(
            content_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

        writer = csv.writer(response)
        writer.writerows(data)

        return response

    return render(request, "404.html")


@login_required(login_url=LOGIN_URL)
@permission_required("user.is_staff", raise_exception=True)
def metrics_delete(request, uuid):
    if request.method == "POST":
        try:
            CompletedConversation.objects.filter(conversation=uuid).delete()

            conversations = Conversation.objects.all().order_by("-created")
            return render(request, "metrics_overview.html", {"conversations": conversations, "message": _("form.response.document_deleted")})
        except Exception as e:
            print(e)
            return HttpResponseServerError()

    return render(request, "404.html")
        