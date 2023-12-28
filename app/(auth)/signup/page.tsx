import Input from "@/components/ui/Input/Input";
import Checkbox from "@/components/ui/Checkbox/Checkbox";
import Button from "@/components/ui/Button/Button";
import cn from "classnames";
import styles from "@/scss/Login/Login.module.scss";

const Signup = () => {
  return ( 
    <div className="container">
      <div className={styles.login}>
        <h2 className={cn(styles.loginTitle, "title-b")}>
          Регистрация
        </h2>
        <form className={styles.loginForm}>
          <Input className={styles.input} placeholder="Имя" />
          <Input className={styles.input} type="email" placeholder="Почта" />
          <Input className={styles.input} type="password" placeholder="Пароль" isPassword />
          <Checkbox className={styles.checkbox} text="Я согласен с условиями пользовательского соглашения" />
          <Button className={styles.button} size="big" type="submit">
            Вход
          </Button>
        </form>
      </div>
    </div>
   );
}
 
export default Signup;