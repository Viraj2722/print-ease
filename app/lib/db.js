// lib/db.js (Updated version)

export async function executeD1Query(sql, params = []) {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sql,
        params
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error('D1 API Error:', error);
    throw new Error(`Database query failed: ${error.errors?.[0]?.message || 'Unknown error'}`);
  }

  const result = await response.json();
  return result.result[0];
}

export async function insertUser(userData) {
  const { name, phone, email, password, role } = userData;
  
  const sql = 'INSERT INTO users (name, phone, email, password, role) VALUES (?, ?, ?, ?, ?)';
  const params = [name, phone, email, password, role || 'user'];
  
  try {
    const result = await executeD1Query(sql, params);
    return {
      success: true,
      userId: result.meta.last_row_id,
      message: 'User created successfully'
    };
  } catch (error) {
    // Handle duplicate email error
    if (error.message.includes('UNIQUE constraint failed: users.email')) {
      return {
        success: false,
        error: 'Email already registered',
        status: 409
      };
    }
    
    return {
      success: false,
      error: 'User registration failed',
      status: 500
    };
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await executeD1Query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (result.results && result.results.length > 0) {
      return {
        success: true,
        user: result.results[0]
      };
    } else {
      return {
        success: false,
        error: 'User not found'
      };
    }
  } catch (error) {
    console.error('Get user error:', error);
    return {
      success: false,
      error: 'Database query failed'
    };
  }
}

export async function getUserById(id) {
  try {
    const result = await executeD1Query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    if (result.results && result.results.length > 0) {
      return {
        success: true,
        user: result.results[0]
      };
    } else {
      return {
        success: false,
        error: 'User not found'
      };
    }
  } catch (error) {
    console.error('Get user by ID error:', error);
    return {
      success: false,
      error: 'Database query failed'
    };
  }
}

export async function updateUser(id, userData) {
  const fields = [];
  const params = [];
  
  Object.entries(userData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      fields.push(`${key} = ?`);
      params.push(value);
    }
  });
  
  if (fields.length === 0) {
    return {
      success: false,
      error: 'No fields to update'
    };
  }
  
  params.push(id);
  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
  
  try {
    const result = await executeD1Query(sql, params);
    return {
      success: true,
      message: 'User updated successfully'
    };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      success: false,
      error: 'User update failed'
    };
  }
}