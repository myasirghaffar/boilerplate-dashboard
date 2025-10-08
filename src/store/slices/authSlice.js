import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import Swal from "sweetalert2"

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.userDetails = null;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setUser, clearUser, setUserDetails } = authSlice.actions;

// Thunk for signup
export const signup = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const { data } = await api.post(`/api/auth/register`, userData);

    return { success: true, user: data.user };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || "Signup failed"));
    Swal.fire({
      title: "Signup Failed",
      text: error.response?.data?.message || error.message || "Signup failed",
      icon: "error",
      confirmButtonColor: "#0370b1",
      customClass: {
        confirmButton: "my-swal-btn",
      },
    });

    return { success: false, error: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Thunk for login (no localStorage)
export const login = (credentials) => async (dispatch) => {

  try {
    dispatch(setLoading(true));

    const { data } = await api.post(`/api/auth/login`, credentials);

    const token = data?.data?.token;
    const user = data?.data?.user;

    dispatch(setUser({ ...user, token }));
    // Redirect using window.location
    // window.location.href = `/${user?.role}/dashboard`;
    return { success: true, user };

  } catch (error) {
    // console.log(error, 'data in error')
    // Swal.fire({
    //   title: "Login Failed",
    //   text: error.response?.data?.message || error.message || "Login failed",
    //   icon: "error",
    //   confirmButtonColor: "#0370b1",
    //   customClass: {
    //     confirmButton: "my-swal-btn",
    //   },
    // });
    console.log(error, 'data in error')
    dispatch(setError(error.response?.data?.error || error.message || "Login failed"));
    return { success: false, error: error.response?.data?.error };
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Thunk for logout (no localStorage)
export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    await new Promise((resolve) => setTimeout(resolve, 500));

    dispatch(clearUser());

    return { success: true };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || "Logout failed"));
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

// Thunk for getting user by ID
export const getUserById = (userId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUserDetails = {
      id: userId,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown, USA",
      profilePicture: "https://example.com/profile.jpg",
    };

    dispatch(setUserDetails(mockUserDetails));

    return { success: true, userDetails: mockUserDetails };
  } catch (error) {
    dispatch(setError(error.response?.data?.message || error.message || "Failed to fetch user data"));
    return { success: false, error: error.message };
  }
};

// Thunk for updating user profile
export const updateUser = (userData) => async (dispatch, getState) => {
  const formData = new FormData();

  // Append all user data fields to FormData
  Object.keys(userData).forEach(key => {
    if (key === 'profileImage' && userData[key]) {
      formData.append('profileImage', userData[key]);
    } else if (userData[key] !== undefined && userData[key] !== null) {
      formData.append(key, userData[key]);
    }
  });

  try {
    dispatch(setLoading(true));

    const { data } = await api.put(`/api/auth/editUser`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Update both user and userDetails in the state
    dispatch(setUser({ ...data.data, token: getState().auth?.user?.token }));
    dispatch(setUserDetails(data.data));

    Swal.fire({
      title: "Success",
      text: "Profile updated successfully",
      icon: "success",
      confirmButtonColor: "#0370b1",
      customClass: {
        confirmButton: "my-swal-btn",
      },
    });

    return { success: true, user: data.data };
  } catch (error) {
    Swal.fire({
      title: "Update Failed",
      text: error.response?.data?.message || error.message || "Failed to update profile",
      icon: "error",
      confirmButtonColor: "#0370b1",
      customClass: {
        confirmButton: "my-swal-btn",
      },
    });
    dispatch(setError(error.response?.data?.message || error.message || "Failed to update profile"));
    return { success: false, error: error.message };
  } finally {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
