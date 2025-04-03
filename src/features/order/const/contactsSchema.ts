import * as yup from "yup";

import { phoneRegExp } from "@/src/shared/const";
import { ContactType } from "@/src/shared/types";

import { ContactFormData } from "../types/contacts";

const getPhoneScheme = () =>
  yup.object().shape({
    type: yup.string(),
    value: yup
      .string()
      .matches(phoneRegExp, "Некорректный телефон")
      .required("Телефон - обязательное поле"),
  });

const getNameScheme = () =>
  yup.object().shape({
    type: yup.string(),
    value: yup.string().required("Обязательное поле"),
  });

const getContactScheme = () =>
  yup.lazy((value) => {
    if (value === undefined) {
      return yup.mixed().notRequired();
    }
    return value.type === "telegram" ? getNameScheme() : getPhoneScheme();
  });

export const formSchema = yup.object().shape({
  name: yup.string().required("ФИО - обязательное поле"),
  postIndex: yup.string().required("Почтовый индекс - обязательное поле"),
  city: yup.string().required("Город - обязательное поле"),
  address: yup.string().required("Адрес - обязательное поле"),
  contact: getContactScheme(),
});

export const defaultValues: ContactFormData = {
  name: "",
  postIndex: "",
  city: "",
  address: "",
  contact: {
    value: "",
    type: ContactType.Telegram,
  },
};