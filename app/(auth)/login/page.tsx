"use client"

import cn from "classnames";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button, Checkbox, Input } from "@/components/shared/ui";
import { useActions } from "@/hooks/useActions";

import styles from "./Login.module.scss";
import { ILogin } from "./Login.interface";

const Login = () => {
  const { login } = useActions();
  const { register, handleSubmit } = useForm<ILogin>();

  const onSubmit = (data: ILogin) => {
    login(data)
  }

  return (
    <div className="container">
      <div className={styles.login}>
        <h2 className={cn(styles.loginTitle, "title-b")}>
          Вход
        </h2>
        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('phone')} className={styles.input} type="tel" placeholder="Номер телефона" />
          <Input {...register('password')} className={styles.input} type="password" placeholder="Пароль" isPassword />
          <Checkbox className={styles.checkbox}>Я согласен с <Link href="#">условиями пользовательского соглашения</Link></Checkbox>
          <Button className={styles.button} size="big" type="submit">
            Вход
          </Button>
        </form>
      </div>
    </div>
   );
}
 
export default Login;