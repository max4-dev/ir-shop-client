"use client";

import cn from "classnames";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/components/shared/ui";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { updateUser, validatePassword } from "@/components/shared/handler";

import { PasswordFormProps } from "./PasswordForm.props";
import styles from "./PasswordForm.module.scss";

const formSchema = yup.object({
  password: yup.string().min(6, "Минимум 6 символов"),
  newPassword: yup.string().min(6, "Минимум 6 символов"),
});

const defaultValues = {
  password: "",
  newPassword: "",
};

export const PasswordForm = ({ className, ...props }: PasswordFormProps) => {
  const { profile } = useTypedSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async ({
    password,
    newPassword,
  }: {
    password?: string;
    newPassword?: string;
  }) => {
    if (!profile || !password) {
      return;
    }

    const response = await validatePassword({ password, phone: profile?.phone });

    if (response?.status) {
      updateUser({
        phone: profile.phone,
        password: newPassword,
      });
    }
  };

  return (
    <div className={cn(className, styles.profileFormBox)} {...props}>
      <form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.profileInputBox}>
          <p className={styles.profileInputText}>Для изменения пароля, введите старый пароль:</p>
          <Input
            {...register("password", { required: true })}
            className={styles.input}
            type="password"
            placeholder="Старый пароль"
            errorMessage={errors.password?.message}
            isPassword
          />
        </div>
        <div className={styles.profileInputBox}>
          <Input
            {...register("newPassword", { required: true })}
            className={styles.input}
            type="password"
            placeholder="Новый пароль"
            errorMessage={errors.newPassword?.message}
            isPassword
          />
        </div>
        <Button className={styles.button} type="submit">
          Изменить пароль
        </Button>
      </form>
    </div>
  );
};
