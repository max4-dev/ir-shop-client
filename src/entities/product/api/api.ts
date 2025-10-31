import { CONFIG } from "@/src/shared/config";

import { ILimitQuery } from "../model/types/product.interface";

export const s3Url = process.env.NEXT_PUBLIC_S3_URL;

export const productsApi = {
  all: `${CONFIG.API_URL}/products`,
  byLimited: ({ limit, page }: ILimitQuery) =>
    `${CONFIG.API_URL}/products?limit=${limit}&page=${page}`,
  byId: (id: string) => `${CONFIG.API_URL}/products/${id}`,
  bySlug: (slug: string) => `${CONFIG.API_URL}/products/by-slug/${slug}`,
};
