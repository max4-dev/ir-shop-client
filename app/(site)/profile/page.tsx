"use client";

import { useEffect } from "react";

import { UserTypes, useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAuth } from "@/hooks/useAuth";
import { useActions } from "@/hooks/useActions";
import { useAppSelector } from "@/redux/store";
import { Loader } from "@/components/shared/ui/Loader/Loader";
import { UserAside } from "@/components/shared/ui/UserAside/UserAside";

import styles from "./Profile.module.scss";

const Profile = () => {
  useAuthRedirect(UserTypes.IsOnlyUser);

  const { user } = useAuth();
  const { profile, isLoading } = useAppSelector((state) => state.profile);

  const { getProfile } = useActions();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user || !user.id) {
        return;
      }

      getProfile();
    };

    fetchProfile();
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
