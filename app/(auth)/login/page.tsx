import Input from "@/components/ui/Input/Input";
import cn from "classnames";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Button from "@/components/ui/Button/Button";
import styles from "@/scss/Login/Login.module.scss";

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
          <Checkbox className={styles.checkbox} text="Я согласен с условиями пользовательского соглашения" />
          <Button className={styles.button} size="big">
            Вход
          </Button>
        </div>
      </div>
    </div>
   );
}
 
export default Login;