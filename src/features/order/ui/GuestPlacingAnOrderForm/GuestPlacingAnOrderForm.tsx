"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import cn from "classnames";
import { Controller, Resolver, useForm } from "react-hook-form";

import { orderRequest } from "@/src/entities/order/handler";
import { ContactsRadioGroup, ContactValueInput } from "@/src/entities/order/ui";
import { useActions, useTypedSelector } from "@/src/shared/hooks";
import { formatPhoneNumber } from "@/src/shared/lib";
import { ContactType } from "@/src/shared/types";
import { Button, Input } from "@/src/shared/ui";

import { defaultValues, formSchema } from "../../const";
import { ContactFormData } from "../../types/contacts";

import styles from "./GuestPlacingAnOrderForm.module.scss";
import { GuestPlacingAnOrderFormProps } from "./GuestPlacingAnOrderForm.props";

export const GuestPlacingAnOrderForm = ({ className, ...props }: GuestPlacingAnOrderFormProps) => {
  const { register: registerGuestUser } = useActions();

  const {
    register,
    handleSubmit,
    control,
    resetField,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    defaultValues,
    resolver: yupResolver(formSchema) as Resolver<ContactFormData>,
    mode: "onChange",
  });
  const { cartProducts, totalCount, totalPrice } = useTypedSelector((state) => state.cart);

  const { contact } = watch();
  console.log(contact);
  

  const handleChangeContactType = (e: string, onChange: (...event: unknown[]) => void) => {
    onChange(e);
    resetField("contact.value", { defaultValue: "" });
  };

  const onSubmit = async (data: ContactFormData) => {
    const formattedData = { ...data };

    if (contact.type !== ContactType.Telegram) {
      formattedData.contact = {
        ...formattedData.contact,
        value: formatPhoneNumber(formattedData.contact.value),
      };
    }

    const token = await registerGuestUser(formattedData);
    console.log(token);
    

    if (!token) return;

    await orderRequest.createGuestOrder({
      ...formattedData,
      token,
      price: totalPrice,
      count: totalCount,
      products: cartProducts,
    });
  };

  return (
    <form className={cn(className, styles.form)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Input {...register("name")} placeholder="ФИО" errorMessage={errors?.name?.message} />
      <Input
        {...register("postIndex")}
        placeholder="Почтовый индекс"
        errorMessage={errors?.postIndex?.message}
      />
      <Input {...register("city")} placeholder="Город" errorMessage={errors?.city?.message} />
      <Input {...register("address")} placeholder="Адрес" errorMessage={errors?.address?.message} />
      <div>
        <Controller
          name="contact.type"
          control={control}
          render={({ field }) => (
            <ContactsRadioGroup
              className={styles.radioGroup}
              field={field}
              handleChangeContactType={handleChangeContactType}
            />
          )}
        />
        <ContactValueInput
          {...register("contact.value")}
          key={contact.type}
          contactType={contact.type as ContactType}
          errorMessage={errors?.contact?.value?.message}
          className={styles.input}
        />
      </div>
      <Button className={styles.submitButton} type="submit">
        Сделать заказ
      </Button>
    </form>
  );
};
