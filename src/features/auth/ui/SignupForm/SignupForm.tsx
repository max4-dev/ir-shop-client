"use client";

import cn from "classnames";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { phoneRegExp } from "@/src/shared/const";
import { useActions, useTypedSelector } from "@/src/shared/hooks";
import { ISignup } from "@/src/shared/api/user";
import { Button, Checkbox, Input, PhoneInput } from "@/src/shared/ui";

import styles from "./SignupForm.module.scss";
import { SignupFormProps } from "./SignupForm.props";

const formSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, "Некорректный телефон")
    .required("Телефон - обязательное поле"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль - обязательное поле"),
  name: yup.string().min(3, "Минимум 3 символа").required("Имя - обязательное поле"),
});

const defaultValues = {
  name: "",
  phone: "",
  password: "",
};

export const SignupForm = ({ className, ...props }: SignupFormProps) => {
  const { signup } = useActions();
  const [phone, setPhone] = useState<string>("");
  const { isLoading } = useTypedSelector((state) => state.user);
  const [isChecked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>({
    defaultValues,
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = ({ password, name }: ISignup) => {
    signup({ phone, password, name });
  };

  return (
    <div className={cn(className, styles.login)}>
      <h2 className={cn(styles.loginTitle, "title-b")}>Регистрация</h2>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} {...props}>
        <Input
          {...register("name", { required: true })}
          errorMessage={errors.name?.message}
          className={styles.input}
          placeholder="Имя"
        />
        <PhoneInput
          {...register("phone")}
          onChange={(phone) => setPhone(phone as string)}
          className={styles.input}
          errorMessage={errors.phone?.message}
        />
        <Input
          {...register("password", { required: true })}
          errorMessage={errors.password?.message}
          className={styles.input}
          type="password"
          placeholder="Пароль"
          isPassword
        />
        <Checkbox
          checked={isChecked}
          onChange={() => setChecked((prevState) => !prevState)}
          className={styles.checkbox}
        >
          Я согласен с <Link href="#">условиями пользовательского соглашения</Link>
        </Checkbox>
        <Button
          className={styles.button}
          size="big"
          type="submit"
          disabled={!isChecked}
          isLoading={isLoading}
        >
          Регистрация
        </Button>
      </form>
      <p className={styles.loginRedirect}>
        Уже есть аккаунт? <Link href="/login">Войти</Link>
      </p>
    </div>
  );
};
