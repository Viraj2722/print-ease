// app/api/auth/signup/route.js

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { insertUser } from '../../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, password } = body;
    
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

    // Insert user into database
    const result = await insertUser({
      name,
      phone,
      email,
      password: hashedPassword,
      role: 'user'
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'User account created successfully',
        userId: result.userId
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status || 500 }
      );
    }

  } catch (error) {
    console.error('User signup error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}