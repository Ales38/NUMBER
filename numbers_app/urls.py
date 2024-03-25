from django.urls import path, include
from .views import *
from .api import *
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register('category', CategoryView, basename="category")
router.register('products', ProductView, basename='products')
router.register('location', LocationView, basename='location')
router.register('order_product', ProductForOrderView, basename='order_products')
router.register('order', OrdersView, basename='order')


urlpatterns = [
    path('', main_page, name='main_page'),
    path('send_tg/', send_tg_data, name='main_page'),
    path('', include(router.urls)),
]
