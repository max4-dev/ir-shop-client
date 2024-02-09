import cn from "classnames";
import Link from "next/link";

import styles from "@/scss/Login/Login.module.scss";
import { Button, Checkbox, Input } from "@/components/shared/ui";


const Login = () => {
  return ( 
    <div className="container">
      <div className={styles.login}>
        <h2 className={cn(styles.loginTitle, "title-b")}>
          Вход
        </h2>
        <div className={styles.loginForm}>
          <Input className={styles.input} placeholder="Имя" />
          <Input className={styles.input} type="password" placeholder="Пароль" isPassword />
          <Checkbox className={styles.checkbox}>Я согласен с <Link href="#">условиями пользовательского соглашения</Link></Checkbox>
          <Button className={styles.button} size="big">
            Вход
          </Button>
        </div>
      </div>
    </div>
   );
}
 
export default Login;