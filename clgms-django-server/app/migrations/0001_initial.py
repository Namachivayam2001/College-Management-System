# Generated by Django 5.1.2 on 2024-10-22 05:08

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='College',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10, unique=True, validators=[django.core.validators.RegexValidator('^[a-zA-Z0-9 ]+$', 'Only alphanumarics are allowed.')])),
                ('name', models.CharField(max_length=255, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('district', models.CharField(max_length=100, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('region', models.CharField(max_length=100, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('type', models.CharField(max_length=100, validators=[django.core.validators.RegexValidator('^[a-zA-Z &]+$', 'Only alphabet and & are allowed.')])),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'college',
                'verbose_name_plural': 'colleges',
                'db_table': 'college',
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_line_one', models.CharField(max_length=255, validators=[django.core.validators.RegexValidator('^[a-zA-Z0-9 ,-]+$', 'Only alphanumaric, comma and - are allowed')])),
                ('city', models.CharField(max_length=50, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('district', models.CharField(max_length=50, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('state', models.CharField(max_length=50, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('pincode', models.CharField(max_length=6, validators=[django.core.validators.RegexValidator('^[0-9]{6}', 'Only numbers with 6 digits are allowed')])),
                ('email', models.CharField(max_length=255, unique=True, validators=[django.core.validators.RegexValidator('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\\\.[A-Z|a-z]{2,}$', 'Email must be in correct form')])),
                ('mobile_number', models.CharField(max_length=10, validators=[django.core.validators.RegexValidator('^[0-9]{10}', 'Mobile number must be in 10 digits')])),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'contact',
                'verbose_name_plural': 'contacts',
                'db_table': 'contact',
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('code', models.CharField(max_length=20, unique=True)),
            ],
            options={
                'verbose_name': 'department',
                'verbose_name_plural': 'departments',
                'db_table': 'department',
            },
        ),
        migrations.CreateModel(
            name='Role',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('COLLEGE_ADMIN', 'College Admin'), ('HOD', 'Head Of The Department'), ('TEACHER', 'Teacher'), ('STUDENT', 'Student')], default='HOD', max_length=25)),
            ],
            options={
                'verbose_name': 'role',
                'verbose_name_plural': 'roles',
                'db_table': 'role',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('first_name', models.CharField(blank=True, max_length=30, null=True, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('last_name', models.CharField(blank=True, max_length=30, null=True, validators=[django.core.validators.RegexValidator('^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')])),
                ('username', models.CharField(default='admin', max_length=25, unique=True)),
                ('password', models.CharField(max_length=128, unique=True, validators=[django.core.validators.RegexValidator('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$', 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.')])),
                ('dob', models.DateField(blank=True, null=True, validators=[django.core.validators.RegexValidator('^\\d{4}-\\d{2}-\\d{2}$', 'Date of birth must be in the format DD-MM-YY')])),
                ('gender', models.CharField(blank=True, choices=[('MALE', 'Male'), ('FEMALE', 'Female'), ('OTHER', 'Other')], max_length=6, null=True)),
                ('join_at', models.DateField(blank=True, null=True)),
                ('leave_at', models.DateField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('update_at', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, related_name='custom_user_set', to='auth.group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='custom_user_set', to='auth.permission')),
                ('college', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='app.college')),
                ('contact', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='app.contact')),
                ('department', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='app.department')),
                ('role', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='users', to='app.role')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'db_table': 'user',
                'unique_together': {('username', 'college')},
            },
        ),
    ]
