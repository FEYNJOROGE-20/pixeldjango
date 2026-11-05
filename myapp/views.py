from django.shortcuts import render


def home(request):
    return render(request, 'home.html', {
        'products': [
            {'name': 'Aura Headphones', 'category': 'Audio', 'price': 129.00, 'image': 'images/im1.webp', 'badge': 'Bestseller'},
            {'name': 'Nova Smart Watch', 'category': 'Wearables', 'price': 189.00, 'image': 'images/s-l1600.webp', 'badge': 'New'},
            {'name': 'Studio Speaker', 'category': 'Audio', 'price': 95.00, 'image': 'images/im1.webp', 'badge': ''},
            {'name': 'Arc Earbuds', 'category': 'Audio', 'price': 79.00, 'image': 'images/s-l1600.webp', 'badge': 'Popular'},
        ],
    })


def about(request):
    return render(request, 'about.html')


def contact(request):
    return render(request, 'contact.html')
def blog(request):
    return render(request, 'blog.html')
