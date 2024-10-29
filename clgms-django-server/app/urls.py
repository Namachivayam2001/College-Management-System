from django.urls import path
from app.views import LoginView, UserView, CollegeView, DepartmentView, GetCollegeByIdView, GetDepartmentByIdView, RoleView, GetRoleByIdView, ContactView, GetContactByIdView, GetUserByIdView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [    
    path('user/login/', LoginView.as_view(), name='login'),
    path('user/registor/', UserView.as_view(), name='user_registor'),
    path('user/get/all/', UserView.as_view(), name='get_users'),
    path('user/get/<int:id>/', GetUserByIdView.as_view(), name='get_user_by_id'),
    path('user/update/patch/<int:id>/', UserView.as_view(), name='update_user_by_id'),
    path('user/delete/<int:id>/', UserView.as_view(), name='delete_user_by_id'),

    path('role/registor/', RoleView.as_view(), name='role_registor'),
    path('role/get/all/', RoleView.as_view(), name='get_roles'),
    path('role/get/<int:id>/', GetRoleByIdView.as_view(), name='get_role_byid'),
    path('role/update/patch/<int:id>/', RoleView.as_view(), name='update_role_by_id'),
    path('role/delete/<int:id>/', RoleView.as_view(), name='delete_role_by_id'),

    path('college/registor/', CollegeView.as_view(), name='college_registor'),
    path('college/get/all/', CollegeView.as_view(), name='get_collegs'),
    path('college/get/<int:id>/', GetCollegeByIdView.as_view(), name='get_colleg_by_id'),
    path('college/update/patch/<int:id>/', CollegeView.as_view(), name='update_colleg_by_id'),
    path('college/delete/<int:id>/', CollegeView.as_view(), name='delete_colleg_by_id'),

    path('contact/registor/', ContactView.as_view(), name='contact_registor'),
    path('contact/get/all/', ContactView.as_view(), name='get_contacts'),
    path('contact/get/<int:id>/', GetContactByIdView.as_view(), name='get_contact_by_id'),
    path('contact/update/patch/<int:id>/', ContactView.as_view(), name='update_contact_by_id'),
    path('contact/delete/<int:id>/', ContactView.as_view(), name='delete_contact_by_id'),

    path('department/registor/', DepartmentView.as_view(), name='department_registor'),
    path('department/get/all/', DepartmentView.as_view(), name='get_departments'),
    path('department/get/<int:id>/', GetDepartmentByIdView.as_view(), name='get_department_by_id'),
    path('department/update/patch/<int:id>/', DepartmentView.as_view(), name='update_department_by_id'),
    path('department/delete/<int:id>/', DepartmentView.as_view(), name='delete_department_by_id'),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # For obtaining the token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # For refreshing the token
]