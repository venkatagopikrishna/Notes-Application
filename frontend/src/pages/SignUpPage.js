import React from "react";
import { SignUpForm } from "../components/SignUpForm";

export default function SignUpPage({ showSuccessNotification }) {
  return (
    <div>
      <SignUpForm showSuccessNotification={showSuccessNotification} />
    </div>
  );
}
