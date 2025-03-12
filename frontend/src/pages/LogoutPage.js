import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../stores/authStore";

export default function LogoutPage({ showSuccessNotification }) {
  const store = authStore();
  const navigate = useNavigate();

  useEffect(() => {
    store.logout(showSuccessNotification);

    if (!store.loggedIn === true) {
      navigate("/login", { replace: true });
    }
  }, [store, navigate, showSuccessNotification]);

  return <div>Logging out...</div>;
}
