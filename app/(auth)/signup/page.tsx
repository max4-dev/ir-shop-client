"use client"

import cn from "classnames";
import { useForm } from "react-hook-form";

import { Button, Checkbox, Input } from "@/components/shared/ui";
import { useActions } from "@/hooks/useActions";

import styles from "./Signup.module.scss";
import { ISignup } from "./Signup.interface";

const Signup = () => {
  const { signup } = useActions();
  const { register, handleSubmit } = useForm<ISignup>();

  const onSubmit = (data: ISignup) => {
    signup(data)
  }

  return ( 
    <div className="container">
      <div className={styles.login}>
        <h2 className={cn(styles.loginTitle, "title-b")}>
          Регистрация
        </h2>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('name')} className={styles.input} placeholder="Имя" />
          <Input {...register('phone')} className={styles.input} type="tel" placeholder="Номер телефона" />
          <Input {...register('password')} className={styles.input} type="password" placeholder="Пароль" isPassword />
          <Checkbox className={styles.checkbox}>Я согласен с условиями пользовательского соглашения</Checkbox>
          <Button className={styles.button} size="big" type="submit">
            Вход
          </Button>
        </form>
      </div>
    </div>
   );
}
 
export default Signup;