import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Admin } from '../models/Admin.js';

dotenv.config();

async function createAdminUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      email: 'admin@kadunacommunity.org',
      password: 'Admin@123456',
      role: 'admin'
    };

    const existingAdmin = await Admin.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const admin = new Admin(adminData);
    await admin.save();
    
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();