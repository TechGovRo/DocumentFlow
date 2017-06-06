import datetime
import json
import time

from django.http import HttpResponseNotFound
from django.shortcuts import render

from establishment.funnel.base_views import JSONErrorResponse, JSONResponse, global_renderer, single_page_app
from establishment.funnel.utils import GlobalObjectCache


def render_ui_widget(request, widget_class, state=None, page_title=None, widget_require=None, widget_options={}):
    context = {}
    if state:
        context["state"] = state.dumps()
    else:
        context["state"] = "{}"

    if widget_class == "MessagesPanel":
        widget_class = "DocFlowApp"
        widget_require = "Bundle"

    # TODO: DEFAULT_PAGE_TITLE should be an option in settings
    context["page_title"] = page_title or "CS Academy"
    context["widget_class"] = widget_class
    context["widget_require"] = widget_require or widget_class
    context["widget_options"] = json.dumps(widget_options)

    return render(request, "docmanager/base.html", context)


def render_csa_app(request):
    return render_ui_widget(request, "CSAApp", state={}, widget_require="Bundle")


@single_page_app
def generic_error_response(request, title, message):
    return JSONResponse({"title": title, "message": message})


global_renderer.render_ui_widget = render_ui_widget
global_renderer.render_single_page_app = render_csa_app
global_renderer.render_error_message = generic_error_response


@single_page_app
def index(request):
    return render(request, "docsmanager/base.html", {})

    if not request.is_ajax():
        return render_ui_widget(request, "CSAApp", state={}, widget_require="Bundle")

    # This should be shared with the blog
    state = GlobalObjectCache(user=request.user)

    blog_posts = BlogEntry.objects.filter(visible=True).prefetch_related("article")
    blog_posts = blog_posts.order_by("-id")[:5]

    for blog_post in blog_posts:
        state.add(blog_post)
        article = blog_post.article
        state.add(article)

    top_users = CSAUser.objects.all().order_by("global_rating_rank")[:10]

    for user in top_users:
        state.add(PublicUserSummary(user))

    upcoming_contests = Contest.objects.filter(end_date__gt=datetime.datetime.now(), is_visible=True)
    state.add_all(upcoming_contests)
    contest_users = ContestUser.objects.filter(contest__in=upcoming_contests.filter(system_generated=True))
    state.add_all(contest_users)

    return JSONResponse({"state": state})


def about(request):
    return render_csa_app(request)


def policy(request):
    return render(request, "docmanader/policy.html", {})


def maintenance_mode(request):
    if request.is_ajax():
        return JSONErrorResponse("Website in maintenance mode!")
    return render(request, "docmanader/maintenance.html", {})


def admin_chat(request):
    if not request.user.is_superuser:
        return HttpResponseNotFound()

    widget_options = {
        "chatId": 1,
        "style": {
            "padding-left": "12%",
            "padding-right": "12%",
        }
    }

    return render_ui_widget(request, "DelayedChat", widget_require="IndexAuthenticated", widget_options=widget_options)


def server_time(request):
    return JSONResponse({"time": time.time()})

