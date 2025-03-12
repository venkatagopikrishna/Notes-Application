import React from "react";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage({ showSuccessNotification }) {
  return (
    <div>
      <LoginForm showSuccessNotification={showSuccessNotification} />
    </div>
  );
}
