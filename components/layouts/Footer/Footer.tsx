import cn from "classnames";
import Image from "next/image";
import Link from "next/link";

import { FooterProps } from "./Footer.props";
import styles from './Footer.module.scss';

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div className="container">
        <div className={styles.footerItems}>
          <div className={cn(styles.footerItem, styles.footerTop)}>
            <div className={styles.footerBox}>
              <Link href="/">
                <Image src="/images/white-logo.svg" width={153} height={37} alt="Логотип" />
              </Link>
            </div>
            <div className={styles.footerBox}>
              <h5 className={styles.footerTitle}>
                Интернет-магазин
              </h5>
              <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                  <Link className={styles.footerListLink} href={"/catalog"}>
                    Каталог
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link className={styles.footerListLink} href={"/catalog"}>
                    Каталог
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link className={styles.footerListLink} href={"/catalog"}>
                    Каталог
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerBox}>
              <h5 className={styles.footerTitle}>
                Компания 
              </h5>
              <ul className={styles.footerList}>
                <li className={styles.footerListItem}>
                  <Link className={styles.footerListLink} href={"/catalog"}>
                    О компании
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link className={styles.footerListLink} href={"/catalog"}>
                    Обратная связь
                  </Link>
                </li>
                <li className={styles.footerListItem}>
                  <Link className={styles.footerListLink} href={"/catalog"}>
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.footerBox}>
              <h5 className={styles.footerTitle}>
                Контакты
              </h5>
              <div className={styles.footerInfo}>
                <h6 className={styles.footerInfoTitle}>
                  Наш адрес:
                </h6>
                <div className={styles.footerInfoText}>
                  <Image className={styles.footerInfoImg} src={"/images/icons/marker.svg"} width={16} height={16} alt="Маркер" />
                  <a className={styles.footerInfoLink} href="#">
                    г. Москва, ул. ... д.... 
                  </a>
                </div>
              </div>
              <div className={styles.footerInfo}>
                <h6 className={styles.footerInfoTitle}>
                  Наш адрес:
                </h6>
                <div className={styles.footerInfoText}>
                  <Image className={styles.footerInfoImg} src={"/images/icons/phone.svg"} width={16} height={16} alt="Маркер" />
                  <a className={styles.footerInfoLink} href="#">
                    +7(8095) 555-55-55
                  </a>
                </div>
              </div>
              <div className={styles.footerInfo}>
                <h6 className={styles.footerInfoTitle}>
                  Наш адрес:
                </h6>
                <div className={styles.footerInfoText}>
                  <Image className={styles.footerInfoImg} src={"/images/icons/mail.svg"} width={16} height={16} alt="Маркер" />
                  <a className={styles.footerInfoLink} href="#">
                    info@zapchasti.com.ru
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={cn(styles.footerItem, styles.footerMiddle)}>
            <div className={styles.footerSocial}>
              <p className={styles.footerSocialText}>
                Мои соцсети:
              </p>
              <div className={styles.footerSocialImages}>
                <a className={styles.footerSocialLink} href="/" target="_blank">
                  <Image className={styles.footerSocialImage} src="/images/social/vk.jpg" width={48} height={48} alt="ВК" />
                </a>
                <a className={styles.footerSocialLink} href="/" target="_blank">
                  <Image className={styles.footerSocialImage} src="/images/social/vk.jpg" width={48} height={48} alt="ВК" />
                </a>
                <a className={styles.footerSocialLink} href="/" target="_blank">
                  <Image className={styles.footerSocialImage} src="/images/social/vk.jpg" width={48} height={48} alt="ВК" />
                </a>
              </div>
            </div>
          </div>
          <div className={cn(styles.footerItem, styles.footerBottom)}>
            <p className={styles.copyright}>
              © «Интернет магазин салфеток» 2024.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}