from django.contrib import admin
from .models import *


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']


class ProductColorInline(admin.TabularInline):
    model = ProductColor
    fields = ['color_name',
              'color_hex',
              'color_image']


class ProductSignTypeInline(admin.TabularInline):
    model = ProductSignType
    fields = [
        'sign_image',
        'sign_name'
    ]


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    fields = ['image']


class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'product_name',
        'category',
        'card_text',
        'price',
        'size',
        'description',
        'additional_text'
    ]
    inlines = [
        ProductColorInline,
        ProductSignTypeInline,
        ProductImageInline
    ]


class ProductColorAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'product',
        'color_name',
        'color_hex',
        'color_image'
    ]


class ProductSignTypeAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'product',
        'sign_image',
        'sign_name'
    ]


class ProductImageAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'product',
        'image'
    ]


class LocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'address', 'description', 'geo_lon', 'geo_lat']


class ProductForOrderAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'product',
        'quantity',
        'colour',
        'set',
        'inlet',
        'sign',
        'price_for_one'
    ]


class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'client_name',
        'email',
        'phone',
        'number',
        'delivery',
        'delivery_point',
        'address',
        'total_sum',
        'order_date'
    ]


admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(ProductColor, ProductColorAdmin)
admin.site.register(ProductSignType, ProductSignTypeAdmin)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(ProductForOrder, ProductForOrderAdmin)
admin.site.register(Order, OrderAdmin)
