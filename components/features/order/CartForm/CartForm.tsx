"use client";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTypedSelector } from "@/hooks/useTypedSelector";
import { Button, Checkbox, CityMenu, CitySearch, Dropdown } from "@/components/shared/ui";
import { IOrderRequest } from "@/components/entities/order/types";
import { orderRequest } from "@/components/entities/order/handler";
import { useAppDispatch } from "@/redux/store";
import { clearProducts } from "@/redux/cart/slice";

import { CartFormProps } from "./CartForm.props";
import styles from "./CartForm.module.scss";

export const CartForm = ({ className, ...props }: CartFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile } = useTypedSelector((state) => state.profile);
  const { address } = useTypedSelector((state) => state.address);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { cartProducts, totalCount, totalPrice } = useTypedSelector((state) => state.cart);

  const defaultValues: IOrderRequest = {
    status: "pending",
    address,
    user: profile,
    products: cartProducts,
    price: totalPrice,
    count: totalCount,
  };
  const { handleSubmit } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: Partial<IOrderRequest>) => {
    const order = await orderRequest.createOrder(data);

    if (order) {
      dispatch(clearProducts());
      router.push("/orders");
    }
  };

  return (
    <form className={cn(className, styles.cartForm)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className={styles.cartFormInputBox}>
        <p className={styles.cartFormText}>Адрес вашей почты:</p>
        <Dropdown
          panelClassName={styles.cityMenu}
          buttonChildren={<div className={styles.city}>{address.value}</div>}
        >
          <CityMenu customInput={CitySearch} />
        </Dropdown>
      </div>
      {/* <div className={styles.cartFormInputBox}>
        <p className={styles.cartFormText}>Выберите желаемый способ связи:</p>
        <TabGroup>
          <TabList>
            <Tab>WhatsApp</Tab>
            <Tab>По телефону</Tab>
            <Tab>Telegram</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Input
                {...register("whatsapp")}
                className={styles.input}
                type="tel"
                placeholder="WhatsApp"
                value={normalizePhoneNumber(whatsapp)}
                onChange={(event) => {
                  setWhatsapp(event.target.value);
                }}
                errorMessage={errors.whatsapp?.message}
              />
            </TabPanel>
            <TabPanel>
              <Input
                {...register("phone")}
                className={styles.input}
                type="tel"
                placeholder="Номер телефона"
                value={normalizePhoneNumber(phone)}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                errorMessage={errors.phone?.message}
              />
            </TabPanel>
            <TabPanel>
              <Input
                {...register("telegram")}
                className={styles.input}
                placeholder="Telegram"
                value={telegram}
                onChange={(event) => {
                  setTelegram(event.target.value);
                }}
                errorMessage={errors.telegram?.message}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div> */}
      <Button
        className={styles.cartFormButton}
        size="fullWidth"
        type="submit"
        disabled={!isChecked}
      >
        Оформить заказ
      </Button>
      <Checkbox
        className={styles.cartFormCheckbox}
        checked={isChecked}
        onChange={() => setIsChecked((prevState) => !prevState)}
      >
        Согласен / согласна с условиями Правил пользования торговой площадкой и правилами возврата
      </Checkbox>
    </form>
  );
};
