"use client";

import { useAuthRedirect, UserTypes } from "@/src/features/auth/hooks";
import { LoginForm } from "@/src/features/auth/ui";

const Login = () => {
  useAuthRedirect(UserTypes.IsOnlyGuest);

  return (
    <div className="container">
      <LoginForm />
    </div>
  );
};

export default Login;
