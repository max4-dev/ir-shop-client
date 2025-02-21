"use client";

import { useAuthRedirect, UserTypes } from "@/src/features/auth/hooks";
import { useTypedSelector } from "@/src/shared/hooks";
import { Loader, UserAside } from "@/src/shared/ui";
import { PasswordForm, ProfileForm } from "@/src/features/profile";

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
