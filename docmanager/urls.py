from django.conf.urls import url
from django.views.generic import RedirectView

from docmanager import views
from django.contrib.sitemaps.views import sitemap

urlpatterns = [
    url(r'^$', views.index, name="index"),
    url(r'^.*/$', views.index),

    # url(r"^favicon.ico$", RedirectView.as_view(url="/static/favicon.png", permanent=False), name="favicon"),

    # url(r"^about/$", views.about, name="about"),
    # url(r"^policy/$", views.policy, name="policy"),
    # url(r"^sitemap\.xml$", sitemap, {"sitemaps": sitemaps}, name="django.contrib.sitemaps.views.sitemap"),
    # url(r"^server_time/$", views.server_time, name="server_time"),
]
