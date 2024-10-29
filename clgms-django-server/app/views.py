from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from app.serializers import UserSerializer, CollegeSerializer, DepartmentSerializer, RoleSerializer, ContactSerializer
from app.models import User, College, Department, Role, Contact
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from datetime import datetime


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):        
        username = request.data.get('username')
        password = request.data.get('password')

        if(username is None or password is None or username == '' or password == ''):
            return Response({'error':'required fields missing'}, status = status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(username=username)
            if not user.check_password(password):
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Generate JWT tokens for the user
            refresh = RefreshToken.for_user(user)
            refresh_token, access_token = str(refresh), str(refresh.access_token) 
            serialized_data = UserSerializer(user).data
            try:
                contact = Contact.objects.get(user = user)
                serialized_data['contact'] = ContactSerializer(contact).data
            except Contact.DoesNotExist:
                serialized_data['contact'] = None
            serialized_data['refresh'], serialized_data['access'] = refresh_token, access_token

            return Response(serialized_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    # Get all user API
    def get(self, request):
        current_user = request.user

        if current_user.is_superuser:
            users = User.objects.all()
            serializer = UserSerializer(users, many = True)
            users_data = []
            for user in serializer.data:
                try:
                    contact = Contact.objects.get(user = user['id'])
                    user['contact'] = ContactSerializer(contact).data
                    users_data.append(user)
                except Contact.DoesNotExist:
                    user['contact'] = None
                    users_data.append(user)
            return Response(users_data, status=status.HTTP_200_OK)
        
        if current_user.role.type == 'COLLEGE_ADMIN':
            users = User.objects.filter(college = current_user.college.id)
            serializer = UserSerializer(users, many = True)
            users_data = []
            for user in serializer.data:
                try:
                    contact = Contact.objects.get(user = user['id'])
                    user['contact'] = ContactSerializer(contact).data
                    users_data.append(user)
                except Contact.DoesNotExist:
                    user['contact'] = None
                    users_data.append(user)
            return Response(users_data, status=status.HTTP_200_OK)

        if current_user.role.type == 'HOD':
            users = User.objects.filter(college = current_user.college.id, Department = current_user.department.id)
            serializer = UserSerializer(users, many = True)
            users_data = []
            for user in serializer.data:
                try:
                    contact = Contact.objects.get(user = user['id'])
                    user['contact'] = ContactSerializer(contact).data
                    users_data.append(user)
                except Contact.DoesNotExist:
                    user['contact'] = None
                    users_data.append(user)
            return Response(users_data, status=status.HTTP_200_OK)
        
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        current_user = request.user

        # Check if the user already exists
        if 'username' in request.data and request.data['username'] is not None and request.data['username'] != '':
            existing_user = User.objects.filter(username=request.data['username']).first()
            if existing_user:
                return Response({'error': 'User with this username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            first_name = request.data.get('first_name', '')[:4].lower()
            last_name = request.data.get('last_name', '')[:1].lower()
            college_code = request.data.get('college', '')           
            dob_str = request.data.get('dob', '')
            if dob_str:
                dob_date = datetime.strptime(dob_str, "%Y-%m-%d").strftime("%Y%m%d")
            username = f"{dob_date}{first_name}{last_name}{college_code}"
            existing_user = User.objects.filter(username=username).first()
            if existing_user:
                return Response({'error': 'User with this username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if current_user.is_superuser:            
            contact_data = request.data.get('contact', '')
            user_serializer = UserSerializer(data = request.data) 
            
            if user_serializer.is_valid():   
                saved_user = user_serializer.save() 

                if contact_data is not None:
                    contact_data['user'] = saved_user.id               
                    contact_serializer = ContactSerializer(data = contact_data)

                    if contact_serializer.is_valid():
                        saved_contact = contact_serializer.save()
                        user_serialize_data = UserSerializer(saved_user).data
                        user_serialize_data['contact'] = ContactSerializer(saved_contact).data

                        return Response(user_serialize_data, status=status.HTTP_201_CREATED)
                
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        elif current_user.role.type == 'COLLEGE_ADMIN' and request.data['role'] in ('HOD','TEACHER', 'STUDENT') and current_user.college.code == request.data['college']:
            contact_data = request.data.get('contact')
            college = request.data.get('college')
            department = request.data.get('department')
            user_serializer = UserSerializer(data = request.data) 

            # Validate that required fields are provided
            if not college or not department:
                return Response({'error': 'College and department are required for assigning an HOD role.'}, status=status.HTTP_400_BAD_REQUEST)
            
            if request.data.get('role') == 'HOD':
                if User.objects.fetch(role='HOD', college=college, department=department):
                    return Response({'error': 'HOD already exist for the department'}, status=status.HTTP_403_FORBIDDEN)

            if user_serializer.is_valid():   
                saved_user = user_serializer.save() 
                
                if contact_data is not None:
                    contact_data['user'] = saved_user.id               
                    contact_serializer = ContactSerializer(data = contact_data)
                    
                    if contact_serializer.is_valid():
                        saved_contact = contact_serializer.save()
                        user_serialize_data = UserSerializer(saved_user).data
                        user_serialize_data['contact'] = ContactSerializer(saved_contact).data                    
                        
                        return Response(user_serialize_data, status=status.HTTP_201_CREATED)
                
                return Response(user_serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request, id):
        current_user = request.user
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Superuser can update any user
        if current_user.is_superuser:
            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                updated_user = serializer.save()
                return Response(UserSerializer(updated_user).data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # College admin can update users in their own college with specific roles
        elif current_user.role.type == 'COLLEGE_ADMIN':
            if user.college != current_user.college:
                return Response({'error': 'Unauthorized to update users in another college'}, status=status.HTTP_403_FORBIDDEN)
            
            # Ensure the role is limited to 'HOD', 'TEACHER', or 'STUDENT'
            if user.role.type not in ('HOD', 'TEACHER', 'STUDENT'):
                return Response({'error': 'Unauthorized to update this role'}, status=status.HTTP_403_FORBIDDEN)

            # If updating to HOD, check if an HOD already exists for the department
            if request.data.get('role') == 'HOD' and user.role.type != 'HOD':
                if User.objects.filter(role='HOD', college=user.college, department=user.department).exists():
                    return Response({'error': 'An HOD already exists for this department'}, status=status.HTTP_403_FORBIDDEN)

            serializer = UserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                updated_user = serializer.save()
                return Response(UserSerializer(updated_user).data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    # Delete a user API
    def delete(self, request, id):
        current_user = request.user
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Superuser can delete any user
        if current_user.is_superuser:
            user.delete()
            return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

        # College admin can delete users in their own college with specific roles
        elif current_user.role.type == 'COLLEGE_ADMIN':
            if user.college != current_user.college:
                return Response({'error': 'Unauthorized to delete users in another college'}, status=status.HTTP_403_FORBIDDEN)

            # Ensure the role is limited to 'HOD', 'TEACHER', or 'STUDENT'
            if user.role.type not in ('HOD', 'TEACHER', 'STUDENT'):
                return Response({'error': 'Unauthorized to delete this role'}, status=status.HTTP_403_FORBIDDEN)

            user.delete()
            return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

class GetUserByIdView(APIView):
    permission_classes = [IsAuthenticated]

    # Get user by id API
    def get(self, request, id):
        current_user = request.user

        try:
            # Retrieve the user by ID
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Superuser access
        if current_user.is_superuser:
            serializer = UserSerializer(user)
            user_data = serializer.data

            # Attempt to retrieve associated contact information
            try:
                contact = Contact.objects.get(user=user.id)
                user_data['contact'] = ContactSerializer(contact).data
            except Contact.DoesNotExist:
                user_data['contact'] = None

            return Response(user_data, status=status.HTTP_200_OK)

        # College Admin access: Check if the user belongs to the same college
        if current_user.role.type == 'COLLEGE_ADMIN' and user.college == current_user.college:
            serializer = UserSerializer(user)
            user_data = serializer.data

            # Attempt to retrieve associated contact information
            try:
                contact = Contact.objects.get(user=user.id)
                user_data['contact'] = ContactSerializer(contact).data
            except Contact.DoesNotExist:
                user_data['contact'] = None

            return Response(user_data, status=status.HTTP_200_OK)

        # HOD access: Check if the user belongs to the same college and department
        if current_user.role.type == 'HOD' and user.college == current_user.college and user.department == current_user.department:
            serializer = UserSerializer(user)
            user_data = serializer.data

            # Attempt to retrieve associated contact information
            try:
                contact = Contact.objects.get(user=user.id)
                user_data['contact'] = ContactSerializer(contact).data
            except Contact.DoesNotExist:
                user_data['contact'] = None

            return Response(user_data, status=status.HTTP_200_OK)

        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

class CollegeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        if current_user.is_superuser or current_user.role.type == 'COLLEGE_ADMIN':
            colleges = College.objects.all()
            serializer = CollegeSerializer(colleges, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
                          
    def post(self, request):
        current_user = request.user
        if current_user.is_superuser:
            serializer = CollegeSerializer(data=request.data)
            if serializer.is_valid():            
                saved_college = serializer.save()
                return Response(CollegeSerializer(saved_college).data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)            
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
        
    def patch(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                college = College.objects.get(id=id)
                serializer = CollegeSerializer(college, data=request.data, partial=True)
                if serializer.is_valid():
                    saved_college = serializer.save()
                    return Response(CollegeSerializer(saved_college).data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except College.DoesNotExist:
                return Response({"error": "College not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                college = College.objects.get(id=id)
                college.delete()
                return Response({"message": "College deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except College.DoesNotExist:
                return Response({"error": "College not found"}, status=status.HTTP_404_NOT_FOUND)
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
        
class GetCollegeByIdView(APIView):
    permission_classes = [IsAuthenticated]
        
    def get(self, request, id):
        current_user = request.user
        if current_user.is_superuser or current_user.role.type == 'COLLEGE_ADMIN':
            try:
                college = College.objects.get(id=id)
                serializer = CollegeSerializer(college)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except College.DoesNotExist:
                return Response({"error": "College not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
        
class DepartmentView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        if current_user.is_superuser or current_user.role.type == 'COLLEGE_ADMIN':
            departments = Department.objects.all()
            serializer = DepartmentSerializer(departments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        current_user = request.user            
        if current_user.is_superuser:
            serializer = DepartmentSerializer(data=request.data)
            if serializer.is_valid():
                saved_department = serializer.save()
                return Response(DepartmentSerializer(saved_department).data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
        
    def patch(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                department = Department.objects.get(id=id)
                serializer = DepartmentSerializer(department, data=request.data, partial=True)
                if serializer.is_valid():
                    saved_department = serializer.save()
                    return Response(DepartmentSerializer(saved_department).data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Department.DoesNotExist:
                return Response({"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                department = Department.objects.get(id=id)
                department.delete()
                return Response({"message": "Department deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Department.DoesNotExist:
                return Response({"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
            
class GetDepartmentByIdView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        current_user = request.user
        if current_user.is_superuser or current_user.role.type == 'COLLEGE_ADMIN':
            try:
                departments = Department.objects.get(id=id)
                serializer = DepartmentSerializer(departments)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Department.DoesNotExist:
                return Response({"error": "Department not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
        
class RoleView(APIView):
    permission_classes = [IsAuthenticated]

    # get all roles API
    def get(self, request):
        current_user = request.user
        if current_user.is_superuser or current_user.role.type == 'COLLEGE_ADMIN':
            roles = Role.objects.all()
            serializer = RoleSerializer(roles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        current_user = request.user            
        if current_user.is_superuser:
            serializer = RoleSerializer(data=request.data)
            if serializer.is_valid():
                saved_role = serializer.save()
                return Response(RoleSerializer(saved_role).data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def patch(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                role = Role.objects.get(id=id)
                serializer = RoleSerializer(role, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    print(serializer.validated_data)
                    return Response(serializer.validated_data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Role.DoesNotExist:
                return Response({"error": "Role not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                role = Role.objects.get(id=id)
                role.delete()
                return Response({"message": "Role deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Role.DoesNotExist:
                return Response({"error": "Role not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

class GetRoleByIdView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        current_user = request.user
        if current_user.is_superuser or current_user.role.type == 'COLLEGE_ADMIN':
            try:
                roles = Role.objects.get(id=id)
                serializer = RoleSerializer(roles)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Role.DoesNotExist:
                return Response({"error": "Role not found"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
 
class ContactView(APIView):
    permission_classes = [IsAuthenticated]

    # get all contacts API
    def get(self, request):
        current_user = request.user
        if current_user.is_superuser:
            contacts = Contact.objects.all()
            contacts_serializer = ContactSerializer(contacts, many=True)
            return Response(contacts_serializer.data, status=status.HTTP_200_OK)
        
        if(current_user.role.type == 'COLLEGE_ADMIN'):
            try:
                # Filter contacts by the college associated with the current college admin
                contacts = Contact.objects.filter(user__college = current_user.college)
                contacts_serializer = ContactSerializer(contacts, many=True)
                return Response(contacts_serializer.data, status=status.HTTP_200_OK)
            except College.DoesNotExist:
                return Response({'error': 'No users under same college || College not found for the current user'}, status=status.HTTP_404_NOT_FOUND)

        if(current_user.role.type == 'HOD'):
            try:
                # Filter contacts by the college associated with the current college admin
                contacts = Contact.objects.filter(user__college = current_user.college, user__deraprtment = current_user.department)
                contacts_serializer = ContactSerializer(contacts, many=True)
                return Response(contacts_serializer.data, status=status.HTTP_200_OK)
            except College.DoesNotExist:
                return Response({'error': 'No users under same college and department || College not found for the current user'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        current_user = request.user            
        if current_user.is_superuser:
            contact_serializer = ContactSerializer(data=request.data)
            if contact_serializer.is_valid():
                updated_contact = contact_serializer.save()
                return Response(ContactSerializer(updated_contact).data, status=status.HTTP_201_CREATED)            
            return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        elif current_user.role.type == 'COLLEGE_ADMIN':
            user_id = request.data.get('user')
            try:
                user = User.objects.get(id=user_id)
                
                # Ensure the user is in the same college as the college admin
                if user.college == current_user.college and user.role.type in ('HOD', 'STUDENT', 'TEACHER'):
                    contact_serializer = ContactSerializer(data=request.data)
                    if contact_serializer.is_valid():
                        updated_contact = contact_serializer.save()
                        return Response(ContactSerializer(updated_contact).data, status=status.HTTP_201_CREATED)                    
                    return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)                
                return Response({'error': 'You can only create contacts for users in your college'}, status=status.HTTP_403_FORBIDDEN)
            except User.DoesNotExist:
                return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)  

        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    # Partially update a contact API
    def patch(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                contact = Contact.objects.get(id=id)
                contact_serializer = ContactSerializer(contact, data=request.data, partial=True)
                if contact_serializer.is_valid():
                    updated_contact = contact_serializer.save()
                    return Response(ContactSerializer(updated_contact).data, status=status.HTTP_200_OK)
                return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Contact.DoesNotExist:
                return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)
        
        elif current_user.role.type == 'COLLEGE_ADMIN':
            try:
                contact = Contact.objects.get(id=id)
                if contact.user.college == current_user.college and contact.user.role.type in ('STUDENT', 'TEACHER', 'HOD'):
                    contact_serializer = ContactSerializer(contact, data=request.data, partial=True)
                    if contact_serializer.is_valid():
                        updated_contact_contact = contact_serializer.save()
                        return Response(ContactSerializer(updated_contact).data, status=status.HTTP_200_OK)
                    return Response(contact_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                return Response({'error': 'Unauthorized to update this contact'}, status=status.HTTP_403_FORBIDDEN)
            except Contact.DoesNotExist:
                return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

    # Delete a contact API
    def delete(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                contact = Contact.objects.get(id=id)
                contact.delete()
                return Response({"message": "Contact deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
            except Contact.DoesNotExist:
                return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)
        
        elif current_user.role.type == 'COLLEGE_ADMIN':
            try:
                contact = Contact.objects.get(id=id)
                # Check if contact's user is in the same college and has a valid role
                if contact.user.college == current_user.college and contact.user.role.type in ('STUDENT', 'TEACHER', 'HOD'):
                    contact.delete()
                    return Response({"message": "Contact deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
                return Response({'error': 'Unauthorized to delete this contact'}, status=status.HTTP_403_FORBIDDEN)
            except Contact.DoesNotExist:
                return Response({"error": "Contact not found"}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)

class GetContactByIdView(APIView):
    permission_classes = [IsAuthenticated]

    # get all contacts API
    def get(self, request, id):
        current_user = request.user
        if current_user.is_superuser:
            try:
                contact = Contact.objects.get(id = id)
                contact_serializer = ContactSerializer(contact)
                return Response(contact_serializer.data, status=status.HTTP_200_OK)
            except Contact.DoesNotExist:
                return Response({'error': 'No contact found'}, status=status.HTTP_404_NOT_FOUND)
        
        if(current_user.role.type == 'COLLEGE_ADMIN'):
            try:
                # Filter contacts by the college associated with the current college admin
                contact = Contact.objects.get(id = id, user__college = current_user.college)
                contact_serializer = ContactSerializer(contact)
                return Response(contact_serializer.data, status=status.HTTP_200_OK)
            except College.DoesNotExist:
                return Response({'error': 'No users under same college || College not found for the current user'}, status=status.HTTP_404_NOT_FOUND)

        if(current_user.role.type == 'HOD'):
            try:
                # Filter contacts by the college associated with the current college admin
                contact = Contact.objects.get(id = id, user__college = current_user.college, user__deraprtment = current_user.department)
                contact_serializer = ContactSerializer(contact)
                return Response(contact_serializer.data, status=status.HTTP_200_OK)
            except College.DoesNotExist:
                return Response({'error': 'No users under same college and department || College not found for the current user'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'error': 'Unauthorized access'}, status=status.HTTP_401_UNAUTHORIZED)
