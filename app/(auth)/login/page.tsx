"use client";

import { LoginForm } from "@/components/features/auth";
import { UserTypes, useAuthRedirect } from "@/hooks/useAuthRedirect";

const Login = () => {
  useAuthRedirect(UserTypes.IsOnlyGuest);

  return (
    <div className="container">
      <LoginForm />
    </div>
  );
};

export default Login;
