import json

from django.http import JsonResponse
from rest_flex_fields import FlexFieldsModelViewSet
from rest_framework import viewsets, permissions
from rest_framework.decorators import action

from .models import *
from .send_tg import send_app_tg
from .serializers import *


# get
class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    http_method_names = ['get']
    permission_classes = (permissions.AllowAny,)


class ProductView(FlexFieldsModelViewSet):
    queryset = Product.objects \
        .prefetch_related('colors') \
        .prefetch_related('sign_type') \
        .prefetch_related('images') \
        .select_related('category').all()
    serializer_class = ProductSerializer
    http_method_names = ['get']
    permission_classes = (permissions.AllowAny,)


class LocationView(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    http_method_names = ['get', 'patch']
    permission_classes = (permissions.AllowAny,)


# post, put, patch, delete

class ProductForOrderView(viewsets.ModelViewSet):
    queryset = ProductForOrder.objects.all()
    serializer_class = ProductForOrderSerializer
    http_method_names = ['post', 'put', 'patch', 'delete']


class OrdersView(viewsets.ModelViewSet):
    queryset = Order.objects.prefetch_related('order_products').all()
    serializer_class = OrderSerializer
    http_method_names = ['post']





def form_message(id, products, address, delivery, delivery_point, total_sum, name, email, phone, number):
    message = f'Заказ № {id}:\n'
    for counter, prod in enumerate(products):
        print(counter, prod)
        if prod['set'] and prod['inlet']:
            message += f'{counter + 1}. {prod["name"]}:\n' \
                       f'Комплект: {prod["set"]}\n' \
                       f'Отверстия: {prod["inlet"]}\n' \
                       f'{int(prod["quantity"]) * int(prod["prodPrice"])} ({prod["quantity"]}x{prod["prodPrice"]})\n'
        elif prod['set'] and prod['prodColor']:
            message += f'{counter +1}. {prod["name"]}:\n' \
                       f'Комплект: {prod["set"]}\n' \
                       f'Цвет: {prod["prodColor"]}\n' \
                       f'{int(prod["quantity"]) * int(prod["prodPrice"])} ({prod["quantity"]}x{prod["prodPrice"]})\n'
        elif prod["prodColor"]:
            message += f'{counter +1}. {prod["name"]}:\n' \
                       f'Цвет: {prod["prodColor"]}\n' \
                       f'{int(prod["quantity"]) * int(prod["prodPrice"])} ({prod["quantity"]}x{prod["prodPrice"]})\n'
        elif prod['sign']:
            message += f'{counter +1}. {prod["name"]}:\n' \
                       f'Знак: {prod["sign"]}\n' \
                       f'{int(prod["quantity"]) * int(prod["prodPrice"])} ({prod["quantity"]}x{prod["prodPrice"]})\n'
        else:
            message += f'{counter +1}. {prod["name"]}: {int(prod["quantity"]) * int(prod["prodPrice"])} ({prod["quantity"]}x{prod["prodPrice"]})\n'

        message += f'{delivery}\n'
        if address != '' and delivery_point == '':
            message += 'Адрес доставки: {}\n'.format(address)
        elif address == '' and delivery_point != '':
            message += 'Пункт получения: {}\n'.format(delivery_point)
        message += 'Сумма платежа: {}\n'.format(total_sum)
        # message += 'Платежная система: {}\n'.format(phone)

        message += '\n\nИнформация о покупателе:\n'
        message += 'ФИО: {}\n'.format(name)
        message += 'Email: {}\n'.format(email)
        message += 'Телефон: {}\n'.format(phone)
        message += 'Номер: {}\n'.format(number)
        return message


def send_order_to_tg(data):
    msg = form_message(
        data['id'],
        data['products'],
        data['address'],
        data['delivery'],
        data['delivery_point'],
        data['total_sum'],
        data['client_name'],
        data['email'],
        data['phone'],
        data['number'])
    send_app_tg(msg)


def send_tg_data(request):
    data = json.loads(request.body)
    send_order_to_tg(data)
    return JsonResponse(data)
