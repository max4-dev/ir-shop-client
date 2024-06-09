"use client";

import { UserTypes, useAuthRedirect } from "@/hooks/useAuthRedirect";
import { Loader, UserAside } from "@/components/shared/ui";
import { ProfileForm, PasswordForm } from "@/components/features/profile";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import styles from "./Profile.module.scss";

const Profile = () => {
  useAuthRedirect(UserTypes.IsOnlyUser);
  const { profile, isLoading } = useTypedSelector((state) => state.profile);

  if (isLoading) {
    return <Loader className={styles.loader} />;
  }

  return (
    <>
      {profile && (
        <div className={styles.profile}>
          <div className="container">
            <div className={styles.profileInner}>
              <UserAside profile={profile} />
              <div className={styles.profileContent}>
                <ProfileForm />
                <PasswordForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
