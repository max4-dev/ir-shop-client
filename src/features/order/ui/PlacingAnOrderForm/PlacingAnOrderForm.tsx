"use client";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Checkbox } from "@/src/shared/ui";
import { useAppDispatch, useTypedSelector } from "@/src/shared/hooks";
import { IOrderRequest } from "@/src/entities/order/types";
import { orderRequest } from "@/src/entities/order/handler";
import { clearProducts } from "@/src/entities/cart/model";

import { PlacingAnOrderFormProps } from "./PlacingAnOrderForm.props";
import styles from "./PlacingAnOrderForm.module.scss";

export const PlacingAnOrderForm = ({ className, ...props }: PlacingAnOrderFormProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { profile } = useTypedSelector((state) => state.profile);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { cartProducts, totalCount, totalPrice } = useTypedSelector((state) => state.cart);

  const defaultValues: IOrderRequest = {
    status: "pending",
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
    <form
      className={cn(className, styles.PlacingAnOrderForm)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className={styles.PlacingAnOrderFormInputBox}>
        <p className={styles.PlacingAnOrderFormText}>Адрес вашей почты:</p>
      </div>
      {/* <div className={styles.PlacingAnOrderFormInputBox}>
        <p className={styles.PlacingAnOrderFormText}>Выберите желаемый способ связи:</p>
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
        className={styles.PlacingAnOrderFormButton}
        size="fullWidth"
        type="submit"
        disabled={!isChecked}
      >
        Оформить заказ
      </Button>
      <Checkbox
        className={styles.PlacingAnOrderFormCheckbox}
        checked={isChecked}
        onChange={() => setIsChecked((prevState) => !prevState)}
      >
        Согласен / согласна с условиями Правил пользования торговой площадкой и правилами возврата
      </Checkbox>
    </form>
  );
};
