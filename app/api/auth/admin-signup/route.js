// app/api/auth/admin-signup/route.js

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { insertUser } from '../../../lib/db';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role');
    
    // Validation
    if (!name || !phone || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Phone number must be 10 digits' },
        { status: 400 }
      );
    }

    // Password validation
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Handle file uploads (optional for now)
    const files = [];
    let fileIndex = 0;
    while (formData.get(`shopVerificationDocs_${fileIndex}`)) {
      const file = formData.get(`shopVerificationDocs_${fileIndex}`);
      files.push({
        name: file.name,
        size: file.size,
        type: file.type
      });
      fileIndex++;
    }

    // Insert user into database
    const result = await insertUser({
      name,
      phone,
      email,
      password: hashedPassword,
      role: role || 'admin'
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Admin account created successfully',
        userId: result.userId
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status || 500 }
      );
    }

  } catch (error) {
    console.error('Admin signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}