from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255, verbose_name="Категория")

    def __str__(self):
        return f'{self.name}'

    class Meta:
        db_table = 'categories'
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    product_name = models.CharField(max_length=255, verbose_name="Имя товара")
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='category')
    card_text = models.TextField(verbose_name="Описание товара", blank=True, null=True)
    price = models.PositiveIntegerField(verbose_name="Цена", blank=True, null=True)
    size = models.CharField(max_length=255, verbose_name="Размер", blank=True, null=True)
    description = models.TextField(verbose_name='Подробное описание товара', blank=True, null=True)
    additional_text = models.TextField(verbose_name="Дополнительное описание товара", blank=True, null=True)

    def __str__(self):
        return f'{self.product_name}'

    class Meta:
        db_table = 'products'
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class ProductColor(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='colors')
    color_name = models.CharField(max_length=255, verbose_name="Цвет")
    color_hex = models.CharField(max_length=255, verbose_name="Код цвета", blank=True, null=True)
    color_image = models.ImageField(upload_to='color_image', verbose_name='Соответствующая картинка', blank=True,
                                    null=True)

    def __str__(self):
        return f'{self.color_name}'

    class Meta:
        db_table = 'product_colors'
        verbose_name = 'Цвет'
        verbose_name_plural = 'Цвета'


class ProductSignType(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sign_type')
    sign_image = models.ImageField(upload_to='sign_image', verbose_name='Соответствующая картинка', null=True,
                                   blank=True)
    sign_name = models.CharField(max_length=255, verbose_name="Знак")

    def __str__(self):
        return f'{self.sign_name}'

    class Meta:
        db_table = 'product_sign_types'
        verbose_name = 'Тип знака'
        verbose_name_plural = 'Типы знака'


class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='product_image', verbose_name='Картинка товара')

    class Meta:
        db_table = 'product_images'
        verbose_name = 'Картинка товара'
        verbose_name_plural = 'Картинки товара'


class Location(models.Model):
    address = models.CharField(max_length=255, verbose_name='Пункт выдачи')
    description = models.CharField(max_length=255, verbose_name='Уточнение', blank=True, null=True)
    geo_lon = models.CharField(max_length=255, verbose_name='Гео-долгота', blank=True, null=True)
    geo_lat = models.CharField(max_length=255, verbose_name='Гео-широта', blank=True, null=True)

    def __str__(self):
        return f'{self.address}'

    class Meta:
        db_table = 'locations'
        verbose_name = 'Пункт выдачи'
        verbose_name_plural = 'Пункты выдачи'


class ProductForOrder(models.Model):
    product_id = models.ForeignKey(Product, on_delete=models.DO_NOTHING, related_name='order_product', default=1)
    product = models.CharField(max_length=255, verbose_name="Название товара")
    quantity = models.PositiveIntegerField(verbose_name="Количество", default=1)
    colour = models.CharField(max_length=20, verbose_name='Цвет', null=True, blank=True)
    set = models.CharField(max_length=5, verbose_name='Комплект', null=True, blank=True)
    inlet = models.CharField(max_length=20, verbose_name='Отверстия', null=True, blank=True)
    sign = models.CharField(max_length=20, verbose_name='Тип знака', null=True, blank=True)
    price_for_one = models.PositiveIntegerField(verbose_name="Цена за 1шт", null=True, blank=True)

    class Meta:
        db_table = 'order_products'
        verbose_name = 'Товар для заказа'
        verbose_name_plural = 'Товары для заказа'


class Order(models.Model):
    products = models.ManyToManyField(ProductForOrder, related_name='order_products')
    client_name = models.CharField(max_length=255, verbose_name="ФИО")
    email = models.CharField(max_length=255, verbose_name="Email")
    phone = models.CharField(max_length=255, verbose_name="Телефон")
    number = models.CharField(max_length=255, verbose_name="Номер", blank=True)
    delivery = models.CharField(max_length=255, verbose_name="Доставка", default='Доставка по России (СДЭК)')
    delivery_point = models.CharField(max_length=255, verbose_name="Пункт получения", null=True, blank=True)
    address = models.CharField(max_length=255, verbose_name="Адрес")
    total_sum = models.PositiveIntegerField(verbose_name="Итоговая сумма")
    order_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата заказа")

    # payment = models.CharField()

    class Meta:
        db_table = 'orders'
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
