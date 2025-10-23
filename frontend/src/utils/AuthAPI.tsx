const API_BASE_URL = 'http://localhost:8000/api'; // Your Laravel API URL

export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
} 

export interface AuthResponse {
  success: boolean;
  user?: User;
  access_token?: string;
  token_type?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export const AuthAPI = {
  async login(username: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Login failed'
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  },

  async signUp(username: string, email: string, password: string, password_confirmation: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Add this for CORS
        body: JSON.stringify({
          name: username, // Add this if your Laravel expects a name
          username,
          email,
          password,
          password_confirmation,
        }),
      });

      const data = await response.json();
      
       if (!response.ok) {
        console.error('Registration error:', data); // Add this for debugging
        return {
          success: false,
          errors: data.errors,
          error: data.errors ? Object.values(data.errors).flat().join(', ') : 'Registration failed'
        };
      }

      // If successful, store the token
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      return {
        success: true,
        user: data.user,
        access_token: data.token,
        token_type: data.token_type
      };
    } catch (error) {
      console.error('Network error:', error); // Add this for debugging
      return {
        success: false,
        error: 'Network error occurred'
      };
    }
  },

  async checkUsername(username: string): Promise<{ available: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/check-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return { available: false };
    }
  }
};

