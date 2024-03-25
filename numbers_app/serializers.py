from rest_framework import serializers
from .models import *
from drf_writable_nested.serializers import WritableNestedModelSerializer
from rest_flex_fields import FlexFieldsModelSerializer


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'


class ProductSignTypeSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = ProductSignType
        fields = (
            'id',
            'sign_image',
            'sign_name'
        )


class ProductColorSerializers(FlexFieldsModelSerializer):
    class Meta:
        model = ProductColor
        fields = ('id', 'color_name', 'color_hex', 'color_image')


class ProductImageSerializer(FlexFieldsModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')


class CategorySerializer(FlexFieldsModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class ProductSerializer(FlexFieldsModelSerializer):
    sign_type = ProductSignTypeSerializer(fields=('id', 'sign_image', 'sign_name'), many=True)
    colors = ProductColorSerializers(fields=('id', 'color_name', 'color_hex', 'color_image'), many=True)
    images = ProductImageSerializer(fields=('id', 'image'), many=True)
    category = CategorySerializer(fields=('id', 'name'), many=False)

    class Meta:
        model = Product
        fields = (
            'id',
            'product_name',
            'card_text',
            'price',
            'size',
            'description',
            'additional_text',
            'sign_type',
            'images',
            'colors',
            'category'
        )


class ProductForOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductForOrder
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': True}}


class OrderSerializer(WritableNestedModelSerializer):
    products = serializers.PrimaryKeyRelatedField(queryset=ProductForOrder.objects.all(), many=True)

    class Meta:
        model = Order
        fields = (
            'id',
            'client_name',
            'email',
            'phone',
            'number',
            'delivery',
            'delivery_point',
            'address',
            'total_sum',
            'order_date',
            'products'
        )
        extra_kwargs = {'id': {'read_only': True}}
