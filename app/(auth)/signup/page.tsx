import { UserTypes, useAuthRedirect } from "@/hooks/useAuthRedirect";
import { SignupForm } from "@/components/features/auth";

const Signup = () => {
  useAuthRedirect(UserTypes.IsOnlyGuest);

  return (
    <div className="container">
      <SignupForm />
    </div>
  );
};

export default Signup;
