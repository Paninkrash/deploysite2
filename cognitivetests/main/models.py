from django.db import models
from django.urls import reverse

class Category(models.Model):
    name = models.CharField(max_length=20, unique = True)
    slug = models.SlugField(max_length = 20, unique = True)


    class Meta:
        ordering = ['name']
        indexes = [models.Index(fields=['name'])]
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'

    def get_absolute_url(self):
        return reverse('main:test_list_by_category',
                        args = [self.slug])
    
    def __str__(self):
        return self.name
        
    
class Test(models.Model):
    category = models.ForeignKey(Category,
                                related_name="tests",
                                on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50)
    image = models.ImageField(upload_to= 'tests/%Y%m%d', blank = True)
    description = models.TextField(blank = True)
    created_at = models.DateTimeField(auto_now_add=True, null = True)

    class Meta:
        ordering = ['name']
        indexes = [models.Index(fields = ['id', 'slug']),
        models.Index(fields = ['name']),
        models.Index(fields = ['-created_at'])
        ]

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('main:test_detail',
                        args = [self.slug])

    
    
    
        

