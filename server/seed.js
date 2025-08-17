const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Department = require('./models/Department');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');
const HOD = require('./models/HOD');

const connectDB = require('./config/database');

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Department.deleteMany({});
    await Student.deleteMany({});
    await Teacher.deleteMany({});
    await HOD.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Create departments
    const csDept = await Department.create({
      name: 'Computer Science',
      code: 'CS',
      description: 'Computer Science Department',
      isActive: true
    });
    
    const engDept = await Department.create({
      name: 'Engineering',
      code: 'ENG',
      description: 'Engineering Department',
      isActive: true
    });
    
    console.log('Departments created');
    
    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const hodPassword = await bcrypt.hash('hod123', salt);
    const teacherPassword = await bcrypt.hash('teacher123', salt);
    const studentPassword = await bcrypt.hash('student123', salt);
    
    // Create admin user
    const adminUser = await User.create({
      email: 'admin@college.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'Admin',
      isActive: true
    });
    
    // Create HOD user
    const hodUser = await User.create({
      email: 'hod@college.com',
      password: hodPassword,
      firstName: 'John',
      lastName: 'Smith',
      role: 'HOD',
      department: csDept._id,
      isActive: true
    });
    
    // Create HOD profile
    await HOD.create({
      userId: hodUser._id,
      employeeId: 'HOD001',
      department: csDept._id,
      phoneNumber: '+1234567890',
      qualification: 'PhD Computer Science',
      experience: '10 years',
      isActive: true
    });
    
    // Create teacher user
    const teacherUser = await User.create({
      email: 'teacher@college.com',
      password: teacherPassword,
      firstName: 'Jane',
      lastName: 'Johnson',
      role: 'Teacher',
      department: csDept._id,
      isActive: true
    });
    
    // Create teacher profile
    await Teacher.create({
      userId: teacherUser._id,
      employeeId: 'T001',
      department: csDept._id,
      phoneNumber: '+1234567891',
      qualification: 'PhD Computer Science',
      experience: '5 years',
      isActive: true
    });
    
    // Create student user
    const studentUser = await User.create({
      email: 'student@college.com',
      password: studentPassword,
      firstName: 'Bob',
      lastName: 'Wilson',
      role: 'Student',
      department: csDept._id,
      isActive: true
    });
    
    // Create student profile
    await Student.create({
      userId: studentUser._id,
      rollNumber: 'CS001',
      studentId: '2024001',
      department: csDept._id,
      currentSemester: 3,
      phoneNumber: '+1234567892',
      isActive: true
    });
    
    console.log('Users and profiles created');
    console.log('Database seeded successfully!');
    
    // Display created data
    console.log('\nCreated Users:');
    console.log('Admin:', adminUser.email);
    console.log('HOD:', hodUser.email);
    console.log('Teacher:', teacherUser.email);
    console.log('Student:', studentUser.email);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
