import { HeaderProps } from "./Header.props";
import cn from "classnames";
import styles from './Header.module.scss';
import Link from "next/link";
import Image from "next/image";
import Search from "@/components/ui/Search/Search";

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={styles.headerTop}>
        <div className="container">
          <div className={styles.headerTopInner}>
            <div className={styles.city}>
              <Image src="/images/icons/location.svg" alt="" width={12} height={12} />
              <button>Москва</button>
            </div>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link href={'/catalog'}>Каталог</Link>
              </li>
              <li className={styles.listItem}>
                <Link href={'/pay'}>Оплата и доставка</Link>
              </li>
              <li className={styles.listItem}>
                <Link href={'/contacts'}>Контакты</Link>
              </li>
            </ul>
            <div className={styles.phone}>
              <Image src="/images/icons/phone.svg" alt="" width={16} height={16} />
              <a href="tel:+79998549080">+7(999) 854-90-80</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.headerBottom}>
        <div className="container">
          <div className={styles.headerBottomInner}>
            <Link href="/">
              <Image src="/images/logo.svg" alt="Логотип" width={181} height={48} />
            </Link>
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
}
 
export default Header;