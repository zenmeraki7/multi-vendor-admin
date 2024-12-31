import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/baseUrl";
import toast from "react-hot-toast";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, formData);
      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      return response.data; // Return user data including token
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// Async thunk for OTP verification
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/vendor/verify-vendor`,
        {
          email,
          otp,
        }
      );

      const { token, user, message } = response.data;

      // Save token and user data in localStorage
      localStorage.setItem("token", token);
      return { token, user, message }; // Return data to be used in fulfilled state
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify OTP"
      );
    }
  }
);

// Async thunk for fetching user details by token
export const fetchUserByToken = createAsyncThunk(
  "user/fetchUserByToken",
  async (_, { rejectWithValue }) => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get(`${BASE_URL}/api/auth/get-user`, {
        headers: {
          authorization: `Bearer ${token}`, // Pass the token in the header
        },
      });

      return response.data; // Return the user data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user data"
      );
    }
  }
);

// Async thunk for uploading documents
export const uploadVendorDocuments = createAsyncThunk(
  "user/uploadVendorDocuments",
  async ({ formData }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/vendor/add-document`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Assuming response contains updated user
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload documents"
      );
    }
  }
);

export const uploadBankDetails = createAsyncThunk(
  "vendor/uploadBankDetails",
  async ({ formData, navigate }, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/vendor/add-bank`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Assuming the response contains the updated user data
    } catch (error) {
      toast.error("Error uploading bank details. Please try again.");
      console.error("Error uploading bank details:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token"), // Initialize token from localStorage
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null; // Clear token on logout
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        // Optionally, store the message if needed
        console.log(action.payload.message); // You can handle this in a UI component
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchUserByToken
      .addCase(fetchUserByToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadVendorDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadVendorDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Update user in Redux state
        state.error = null;
      })
      .addCase(uploadVendorDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // Update user in Redux state
        state.error = null;
      })
      .addCase(uploadBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
