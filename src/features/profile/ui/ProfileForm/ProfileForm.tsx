"use client";

import cn from "classnames";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useState } from "react";

import { phoneRegExp, phoneStartRegExp } from "@/src/shared/const";
import { useTypedSelector } from "@/src/shared/hooks";
import { PhoneStart } from "@/src/entities/user/types";
import { updateUser } from "@/src/entities/user/handler";
import { Button, Input } from "@/src/shared/ui";
import { normalizePhoneNumber } from "@/src/shared/lib";

import styles from "./ProfileForm.module.scss";
import { ProfileFormProps } from "./ProfileForm.props";

const formSchema = yup.object({
  name: yup.string().min(3, "Минимум 3 символа"),
  phone: yup.string().matches(phoneStartRegExp, "Телефон должен начинаться с +7").matches(phoneRegExp, "Некорректный телефон"),
});

export const ProfileForm = ({ className, ...props }: ProfileFormProps) => {
  const { profile } = useTypedSelector((state) => state.profile);
  const [phone, setPhone] = useState<string>(profile?.phone ?? PhoneStart.RU);
  const [name, setName] = useState<string>(profile?.name ?? "");
  const defaultValues = {
    name,
    phone,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = ({ phone, name }: { phone?: string; name?: string }) => {
    if (phone) {
      updateUser({ phone: `${parsePhoneNumberFromString(phone)?.number}`, name });
    }
  };

  return (
    <div className={cn(className, styles.profileFormBox)} {...props}>
      <form className={styles.profileForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.profileInputBox}>
          <p className={styles.profileInputText}>Изменить имя:</p>
          <Input
            {...register("name", { required: true })}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            errorMessage={errors.name?.message}
          />
        </div>
        <div className={styles.profileInputBox}>
          <p className={styles.profileInputText}>Изменить номер телефона:</p>
          <Input
            {...register("phone", { required: true })}
            className={styles.input}
            type="tel"
            placeholder="Номер телефона"
            value={normalizePhoneNumber(phone)}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
            errorMessage={errors.phone?.message}
          />
        </div>
        <Button className={styles.button} type="submit">
          Сохранить
        </Button>
      </form>
    </div>
  );
};
