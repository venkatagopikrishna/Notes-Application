import { create } from "zustand";
import axios from "axios";

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    email: "",
    password: "",
  },

  signUpForm: {
    email: "",
    password: "",
  },

  updateloginFormState: (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value,
        },
      };
    });
  },

  updateSignUpFormState: (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    set((state) => {
      return {
        signUpForm: {
          ...state.signUpForm,
          [name]: value,
        },
      };
    });
  },

  signUp: async (e, onSuccess) => {
    e.preventDefault();

    const { signUpForm } = authStore.getState();

    try {
      const res = await axios.post("/signup", signUpForm);
      if (res.status === 200) {
        set({
          signUpForm: {
            email: "",
            password: "",
          },
        });

        if (onSuccess) onSuccess("Signed up successfully!");

        return true;
      }
      return false;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(
          "This email is already registered. Please use a different email."
        );
      } else {
        alert("Sign-up failed. Please try again later.");
      }
      return false;
    }
  },

  login: async (e, onSuccess) => {
    e.preventDefault();
  
    const { loginForm } = authStore.getState();
  
    try {
      const res = await axios.post(
        "http://localhost:5000/login", // ✅ Use full URL with correct port
        loginForm,
        { withCredentials: true } // ✅ Include credentials (cookies)
      );
  
      if (res.status === 200) {
        set({ loggedIn: true });
        set({
          loginForm: {
            email: "",
            password: "",
          },
        });
  
        if (onSuccess) onSuccess("Logged in successfully!");
  
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Error Response:", error.response.data);
      }
      return false;
    }
  },
  
  

  logout: async (onSuccess) => {
    try {
      await axios.get("/logout");
      if (onSuccess) onSuccess("Logged out successfully!");
      set({ loggedIn: false });
    } catch (error) {
      console.log(error);
    }
  },

  checkAuth: async () => {
    try {
      await axios.get("/check-auth");
      set({ loggedIn: true });
    } catch (error) {
      set({ loggedIn: false });
    }
  },
}));

export default authStore;
