from django.shortcuts import render, get_object_or_404
from .models import Test, Category

def popular_list(request):
    tests = Test.objects.all()
    return render(request, 'main/index/index.html', {'tests': tests})

def test_detail(request, slug):
    test = get_object_or_404(Test, slug = slug)

    return render(request, 'main/test/detail.html', {'test' : test})

def test_list(request, category_slug = None):
    category = None
    categories = Category.objects.all()
    tests = Test.objects.all()
    if category_slug:
        category = get_object_or_404(Category, slug = category_slug)
        tests = tests.filter(category = category)
    return render(request, 'main/test/list.html',
    {'category': category,
    'categories': categories,
    'tests': tests})

