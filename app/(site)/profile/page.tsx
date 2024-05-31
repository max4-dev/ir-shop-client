"use client";

import { useEffect } from "react";

import { UserTypes, useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { Loader, UserAside } from "@/components/shared/ui";
import { ProfileForm, PasswordForm } from "@/components/features/profile";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import useRetryRequest from "@/hooks/useRetryRequest";

import styles from "./Profile.module.scss";

const Profile = () => {
  useAuthRedirect(UserTypes.IsOnlyUser);
  const { user } = useAuth();
  const { profile, isLoading } = useTypedSelector((state) => state.profile);

  const { getProfile } = useActions();

  const { setRetry } = useRetryRequest({ requestFn: getProfile, user });

  useEffect(() => {
    setRetry(false);
  }, []);

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
