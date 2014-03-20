from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'gallery.views.index', name='home'),
    url(r'^views/main.html/$', 'gallery.views.feedTemplateRequest'),
    url(r'^views/mobile.html/$', 'gallery.views.mobileTemplateRequest'),
    url(r'^views/landing.html/$', 'gallery.views.landingTemplateRequest'),
    
                       
    # url(r'^iainmingo/', include('iainmingo.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
