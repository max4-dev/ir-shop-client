"use client";

import cn from "classnames";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Button, Input, PhoneInput } from "@/src/shared/ui";
import { ILogin } from "@/src/entities/user/types";
import { useActions, useTypedSelector } from "@/src/shared/hooks";
import { phoneRegExp } from "@/src/shared/const";

import styles from "./LoginForm.module.scss";
import { ILoginFormProps } from "./LoginForm.props";

const formSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, "Некорректный телефон")
    .required("Телефон - обязательное поле"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль - обязательное поле"),
});

const defaultValues = {
  phone: "",
  password: "",
};

export const LoginForm = ({ className, ...props }: ILoginFormProps) => {
  const { login } = useActions();
  const { isLoading } = useTypedSelector((state) => state.user);
  const [parsedPhone, setParsedPhone] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues,
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = ({ password }: ILogin) => {
    login({ phone: parsedPhone, password });
  };

  return (
    <div className={cn(className, styles.login)}>
      <h2 className={cn(styles.loginTitle, "title-b")}>Вход</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} {...props}>
        <PhoneInput
          {...register("phone")}
          onChange={(phone) => setParsedPhone(phone as string)}
          className={styles.input}
          errorMessage={errors.phone?.message}
        />
        <Input
          {...register("password", { required: true })}
          className={styles.input}
          type="password"
          placeholder="Пароль"
          errorMessage={errors.password?.message}
          isPassword
        />
        <Button className={styles.button} size="big" type="submit" isLoading={isLoading}>
          Вход
        </Button>
      </form>
      <p className={styles.loginRedirect}>
        Вы еще не зарегистрированны? <Link href="/signup">Регистрация</Link>
      </p>
    </div>
  );
};
