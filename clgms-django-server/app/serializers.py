from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from app.models import User, College, Contact, Department, Role

class ContactSerializer(ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id','user', 'address_line_one', 'city', 'district', 'state', 'pincode', 'email', 'mobile_number']
        extra_kwargs = {
            'id': {'read_only': True}
        }

class RoleSerializer(ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'type']
        extra_kwargs = {
            'id': {'read_only': True}
        }

class CollegeSerializer(ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'code', 'name', 'district', 'region', 'type']
        extra_kwargs = {
            'id': {'read_only': True}
        }

class DepartmentSerializer(ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'code', 'name']
        extra_kwargs = {
            'id': {'read_only': True}
        }

class UserSerializer(ModelSerializer):
    college = serializers.CharField()  # Accepts college code as a string
    department = serializers.CharField()  # Accepts department code as a string
    role = serializers.CharField()  # Accepts role type as a string
    
    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'username', 'password', 'dob', 'gender', 'join_at', 
            'leave_at', 'college', 'department', 'role', 'is_active', 'is_staff', 'is_superuser'
        ]
        extra_kwargs = {
            'id': {'read_only': True},
            'password': {
                'write_only': True,
                'required': False,
                'allow_blank': True
            },
            'username': {
                'required': False,
                'allow_blank': True
            },
            'join_at': {'required': False},
            'leave_at': {'required': False},
            'is_active': {'required': False},
            'is_staff': {'required': False},
            'is_superuser': {'required': False},
            'department': {'required': False}
        }

    def validate(self, attrs):
        # Validate college by name and assign its instance to the college field
        college_code = attrs.get('college')
        try:
            attrs['college'] = College.objects.get(code=college_code)
        except College.DoesNotExist:
            raise serializers.ValidationError({"college": f"College with code '{college_code}' does not exist."})
        
        # Validate department by name and assign its instance to the department field
        department_code = attrs.get('department')
        if department_code:
            try:
                attrs['department'] = Department.objects.get(code=department_code)
            except Department.DoesNotExist:
                raise serializers.ValidationError({"department": f"Department with code '{department_code}' does not exist."})
        
        # Validate role by type and assign its instance to the role field
        role = attrs.get('role')
        if role:
            try:
                attrs['role'] = Role.objects.get(type=role)
            except Role.DoesNotExist:
                raise serializers.ValidationError({"role": f"Role '{role}' does not exist."})

        return attrs

    def create(self, validated_data):

        if not validated_data.get('username'):
            dob_str = validated_data.get('dob').strftime("%Y%m%d")  # Format dob as YYYYMMDD
            first_name = validated_data.get('first_name', '')[:4].lower()  # First 4 characters of first name
            last_name = validated_data.get('last_name', '')[:1].lower()  # First character of last name
            college_code = validated_data['college'].code  # Get the college code
            validated_data['username'] = f"{dob_str}{first_name}{last_name}{college_code}"

        if not validated_data.get('password'):
            validated_data['password'] = validated_data.get('username')
        
        # Create the user instance with the contact
        user = User.objects.create(**validated_data)
        
        # Set the password using the set_password method
        user.set_password(validated_data['password'])
        user.save()
        
        return user
    

