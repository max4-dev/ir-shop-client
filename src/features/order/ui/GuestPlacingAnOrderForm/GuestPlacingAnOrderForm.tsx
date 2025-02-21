"use client";

import cn from "classnames";
import { RadioGroup } from "@headlessui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Resolver, useForm } from "react-hook-form";

import { RadioItem } from "@/src/shared/ui";
import { phoneRegExp } from "@/src/shared/const";
import { ContactType } from "@/src/shared/types";
import { ContactValueInput } from "@/src/entities/order/ui";

import { ContactFormData, GuestPlacingAnOrderFormProps } from "./GuestPlacingAnOrderForm.props";
import styles from "./GuestPlacingAnOrderForm.module.scss";

const getPhoneScheme = () =>
  yup.object().shape({
    type: yup.string(),
    value: yup
      .string()
      .matches(phoneRegExp, "Некорректный телефон")
      .required("Телефон - обязательное поле"),
  });

const getNameScheme = () => (
  yup.object().shape({
    type: yup.string(),
    value: yup.string().required("Обязательное поле"),
  })
)

const getContactScheme = () =>
  yup.lazy((value) => {
    if (value === undefined) {
      return yup.mixed().notRequired();
    }
    return value.type === "telegram" ? getNameScheme() : getPhoneScheme();
  });

const defaultValues: ContactFormData = {
  name: "",
  postIndex: "",
  city: "",
  address: "",
  contact: {
    value: "",
    type: ContactType.Telegram,
  },
};

export const GuestPlacingAnOrderForm = ({ className, ...props }: GuestPlacingAnOrderFormProps) => {
  const formSchema = yup.object().shape({
    // name: yup.string().required("ФИО - обязательное поле"),
    // postIndex: yup.string().required("Почтовый индекс - обязательное поле"),
    // city: yup.string().required("Город - обязательное поле"),
    // address: yup.string().required("Адрес - обязательное поле"),
    contact: getContactScheme(),
  });
  
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

  const { contact } = watch();
  console.log(contact.type);
  

  const handleChangeContactType = (e: string, onChange: (...event: unknown[]) => void) => {
    onChange(e);
    resetField("contact.value", { defaultValue: "" });
  };

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <form className={cn(className, styles.form)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <Controller
        name="contact.type"
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            onChange={(e) => handleChangeContactType(e, field.onChange)}
            aria-label="Выберите способ связи"
          >
            <RadioItem
              value={ContactType.Telegram}
              label="Telegram"
            />
            <RadioItem
              value={ContactType.Whatsapp}
              label="Whatsapp"
            />
            <RadioItem
              value={ContactType.Phone}
              label="По телефону"
            />
          </RadioGroup>
        )}
      />
      <ContactValueInput
        {...register("contact.value")}
        key={contact.type}
        contactType={contact.type as ContactType}
        errorMessage={errors?.contact?.value?.message}
        className={styles.input}
      />
      <button type="submit">Сделать заказ</button>
    </form>
  );
};
