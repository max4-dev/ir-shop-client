"use client"

import cn from "classnames";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import parsePhoneNumberFromString from "libphonenumber-js";

import { Button, Checkbox, Input } from "@/components/shared/ui";
import { useActions } from "@/hooks/useActions";
import { phoneRegExp } from "@/helpers/const/phoneRegExp";

import { PhoneStart } from "../login/Login.interface";

import styles from "./Signup.module.scss";
import { ISignup } from "./Signup.interface";

const formSchema = yup.object({
  phone: yup.string().matches(phoneRegExp, "Некорректный телефон").required("Телефон - обязательное поле"),
  password: yup.string().required("Пароль - обязательное поле"),
  name: yup.string().min(3, "Минимум 3 символа").required("Имя - обязательное поле"),
});

const defaultValues = {
  name: "",
  phone: PhoneStart.RU,
  password: "",
};

const Signup = () => {
  const { signup } = useActions();
  const [phone, setPhone] = useState<string>(PhoneStart.RU)
  const [isChecked, setChecked] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm<ISignup>({
    defaultValues,
    resolver: yupResolver(formSchema),
    mode: 'onChange'
  });
  
  const onSubmit = ({ phone, password, name }: ISignup) => {
    signup({ phone: `${parsePhoneNumberFromString(phone)?.number}`, password, name })
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
          Регистрация
        </h2>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register('name', { required: true })}
            errorMessage={errors.name?.message}
            className={styles.input}
            placeholder="Имя"
          />
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
          <Input
            {...register('password', { required: true })}
            errorMessage={errors.password?.message}
            className={styles.input}
            type="password"
            placeholder="Пароль"
            isPassword
          />
          <Checkbox setChecked={setChecked} className={styles.checkbox}>
            Я согласен с <Link href="#">условиями пользовательского соглашения</Link>
          </Checkbox>
          <Button className={styles.button} size="big" type="submit" disabled={isChecked}>
            Регистрация
          </Button>
        </form>
        <p className={styles.loginRedirect}>
          Уже есть аккаунт? <Link href='/login'>Войти</Link>
        </p>
      </div>
    </div>
   );
}
 
export default Signup;