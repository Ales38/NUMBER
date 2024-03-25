from django.shortcuts import render
from .data import *


def main_page(request):
    template_name = 'main.html'
    # all_categories = list(filter(lambda x: x['category'], data))
    # numbers_category = all_categories[0]
    # frames_category = all_categories[1]
    # accessories_category = all_categories[2]
    # signs_category = all_categories[3]
    # context = {
    #     'all_categories': all_categories,
    #     'frames_category': frames_category,
    #     'signs_category': signs_category,
    #     'numbers_category': numbers_category,
    #     'accessories_category': accessories_category
    # }
    return render(request, template_name)
