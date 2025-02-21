"use client";

import { useAuthRedirect, UserTypes } from "@/src/features/auth/hooks";
import { SignupForm } from "@/src/features/auth/ui";

const Signup = () => {
  useAuthRedirect(UserTypes.IsOnlyGuest);

  return (
    <div className="container">
      <SignupForm />
    </div>
  );
};

export default Signup;
