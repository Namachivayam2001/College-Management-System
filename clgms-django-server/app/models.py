from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# Define a regex validator to allow only specific characters
alphabetic_validator = RegexValidator(r'^[a-zA-Z ]+$', 'Only alphabetic characters are allowed.')
numaric_validator = RegexValidator(r'^[0-9]+$', 'Only numbers are allowed.')
alphanumaric_validator = RegexValidator(r'^[a-zA-Z0-9 ]+$', 'Only alphanumarics are allowed.')
alpha_with_at_validator = RegexValidator(r'^[a-zA-Z &]+$', 'Only alphabet and & are allowed.')
address_line_validator = RegexValidator(r'^[a-zA-Z0-9 ,-]+$', 'Only alphanumaric, comma and - are allowed')
pincode_validator = RegexValidator(r'^[0-9]{6}', 'Only numbers with 6 digits are allowed')
mobile_no_validator = RegexValidator(r'^[0-9]{10}', 'Mobile number must be in 10 digits')
password_validator = RegexValidator(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$', 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character.')
username_pattern_validator = RegexValidator(r'^\d{6}_[A-Z]{1,4}_[A-Z]{1}_[a-zA-Z0-9]{1,10}$', 'Username must follow the pattern: DDMMYYYY_firstname[4 char]_[lastname[1 char]]_[college code]')
dob_pattern_validator = RegexValidator(r'^\d{4}-\d{2}-\d{2}$', 'Date of birth must be in the format DD-MM-YY')


class Role(models.Model):
    role_choices = [
        ('COLLEGE_ADMIN', 'College Admin'),
        ('HOD', 'Head Of The Department'),
        ('TEACHER', 'Teacher'),
        ('STUDENT', 'Student')
    ]
    type = models.CharField(
        max_length = 25,
        choices = role_choices,
        default = 'STUDENT',
        unique = True
    )

    class Meta:
        db_table = 'role'
        verbose_name = 'role'
        verbose_name_plural = 'roles'

    def __str__(self):
        return self.type

class College(models.Model):
    code = models.CharField(
        unique = True,
        validators = [alphanumaric_validator],
        max_length = 10
    )
    name = models.CharField(
        max_length = 255,
        validators = [alphabetic_validator]
    )
    district = models.CharField(
        max_length = 100,
        validators = [alphabetic_validator]
    )
    region = models.CharField(
        max_length = 100,
        validators = [alphabetic_validator]
    )
    type = models.CharField(
        max_length = 100,
        validators = [alpha_with_at_validator]
    )
    create_at = models.DateTimeField(auto_now_add = True)
    update_at = models.DateTimeField(auto_now = True)

    class Meta:
        db_table = 'college'
        verbose_name = 'college'
        verbose_name_plural = 'colleges'

    def __str__(self):
        return self.name

class Department(models.Model):
    name = models.CharField(
        max_length = 100,
        validators = [alphabetic_validator],
        unique = True
    )
    code = models.CharField(
        max_length = 20,
        unique = True
    )

    class Meta:
        db_table = 'department'
        verbose_name = 'department'
        verbose_name_plural = 'departments'

    def __str__(self):
        return self.name

class UserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(
        max_length=30, 
        validators=[alphabetic_validator],
        null = True,
        blank = True
    )
    last_name = models.CharField(
        max_length=30, 
        validators=[alphabetic_validator],
        null = True,
        blank = True
    )   
    username = models.CharField(
        max_length=25, 
        unique = True,
        default = 'admin'
    )
    password = models.CharField(
        max_length=128,
        unique = True,
        validators = [password_validator]
    )  
    dob = models.DateField(
        validators = [dob_pattern_validator],
        null = True,
        blank = True
    )
    GENDER_CHOICES = [
        ('MALE', 'Male'),
        ('FEMALE', 'Female'),
        ('OTHER', 'Other'),
    ]
    gender = models.CharField(
        max_length=6, 
        choices=GENDER_CHOICES,
        null = True,
        blank = True
    )
    join_at = models.DateField(
        null = True,
        blank = True
    )
    leave_at = models.DateField(
        null=True, 
        blank=True
    )
    college = models.ForeignKey(
        College, 
        on_delete=models.CASCADE, 
        related_name='users',
        blank = True,
        null = True
    )
    department = models.ForeignKey(
        Department, 
        on_delete=models.SET_NULL, 
        related_name='users',
        blank = True,
        null = True
    )
    role = models.ForeignKey(
        Role, 
        on_delete=models.SET_NULL, 
        related_name='users',
        blank = True,
        null = True
    )
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    create_at = models.DateTimeField(auto_now_add = True)
    update_at = models.DateTimeField(auto_now = True)

    # Specify related_name to avoid conflicts with default Django User model
    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set', blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'

    class Meta:
        db_table = 'user'
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __str__(self):
        return self.username

class Contact(models.Model):
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='contacts',
        blank = True,
        null = True
    )
    address_line_one = models.CharField(
        max_length = 255,   
        validators = [address_line_validator]
    )
    city = models.CharField(
        max_length = 50,
        validators = [alphabetic_validator]
    )
    district = models.CharField(
        max_length = 50,
        validators = [alphabetic_validator]
    )
    state = models.CharField(
        max_length = 50,
        validators = [alphabetic_validator]
    )
    pincode = models.CharField(
        max_length = 6,
        validators = [pincode_validator]
    )
    email = models.CharField(
        max_length = 255,
        # validators = [email_validator],
        unique = True
    )
    mobile_number = models.CharField(
        max_length = 10,
        validators = [mobile_no_validator]
    )
    create_at = models.DateTimeField(auto_now_add = True)
    update_at = models.DateTimeField(auto_now = True)

    class Meta:
        db_table = 'contact'
        verbose_name = 'contact'
        verbose_name_plural = 'contacts'

    def __str__(self):
        return self.email
 













































