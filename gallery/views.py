from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, HttpResponseBadRequest
from json import dumps, loads, JSONEncoder
from django.core.serializers import serialize
from django.template.response import TemplateResponse

def index(request):

    context = {}

    return render(request, "index.html", context)


def feedTemplateRequest(request):

    response = TemplateResponse(request, "main.html", {})

    return response

def mobileTemplateRequest(request):

    response = TemplateResponse(request, 'mobile.html', {})

    return response

def landingTemplateRequest(request):

    response = TemplateResponse(request, 'landing.html', {})

    return response
