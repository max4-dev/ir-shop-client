"use client"

import cn from "classnames";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useState } from "react";

import { Button, Input } from "@/components/shared/ui";
import { useActions } from "@/hooks/useActions";
import { phoneRegExp } from "@/helpers/const/phoneRegExp";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

import styles from "./Login.module.scss";
import { ILogin, PhoneStart } from "./Login.interface";

const formSchema = yup.object({
  phone: yup.string().matches(phoneRegExp, "Некорректный телефон").required("Телефон - обязательное поле"),
  password: yup.string().min(6, "Минимум 6 символа").required("Пароль - обязательное поле"),
});

const defaultValues = {
  phone: PhoneStart.RU,
  password: "",
};

const Login = () => {
  useAuthRedirect('isOnlyGuest');
  const { login } = useActions();
  const [phone, setPhone] = useState<string>(PhoneStart.RU)
  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    defaultValues,
    resolver: yupResolver(formSchema),
    mode: 'onChange'
  });

  const onSubmit = ({ phone, password }: ILogin) => {
    login({ phone: `${parsePhoneNumberFromString(phone)?.number}`, password })
  }

  const normalizePhoneNumber = (value: string) => {
    const phoneNumber = parsePhoneNumberFromString(value);
    if (!phoneNumber) {
      return value;
    }

    return phoneNumber.formatInternational()
  }

  return (
    <div className="container">
      <div className={styles.login}>
        <h2 className={cn(styles.loginTitle, "title-b")}>
          Вход
        </h2>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('phone', { required: true })}
            className={styles.input}
            type="tel"
            placeholder="Номер телефона"
            value={normalizePhoneNumber(phone)}
            onChange={(event) => {
              setPhone(event.target.value)
            }}
            errorMessage={errors.phone?.message}
          />
          <Input {...register('password', { required: true })} className={styles.input} type="password" placeholder="Пароль" errorMessage={errors.password?.message} isPassword />
          <Button className={styles.button} size="big" type="submit">
            Вход
          </Button>
        </form>
        <p className={styles.loginRedirect}>
          Вы еще не зарегистрированны? <Link href='/signup'>Регистрация</Link>
        </p>
      </div>
    </div>
   );
}
 
export default Login;