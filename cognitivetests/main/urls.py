from django.urls import path 
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.popular_list, name = 'popular_list'),
    path('shop/', views.test_list, name = 'test_list'),
    path('shop/category/<slug:category_slug>/', views.test_list, name = 'test_list_by_category'),
    path('shop/<slug:slug>/', views.test_detail,
    name = 'test_detail'),
    path('test/start/<slug:slug>/', views.test_start, name='test_start'),
]