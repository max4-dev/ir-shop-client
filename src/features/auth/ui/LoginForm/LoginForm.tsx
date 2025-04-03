"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { ILogin } from "@/src/entities/user/types";
import { phoneRegExp } from "@/src/shared/const";
import { useActions, useTypedSelector } from "@/src/shared/hooks";
import { Button, Input, PhoneInput } from "@/src/shared/ui";

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILogin>({
    defaultValues,
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = (data: ILogin) => {
    login(data);
  };

  return (
    <div className={cn(className, styles.login)}>
      <h2 className={cn(styles.loginTitle, "title-b")}>Вход</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} {...props}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
              className={styles.input}
              errorMessage={errors.phone?.message}
            />
          )}
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
