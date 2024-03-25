import { API_URL } from "@/components/shared/api/const/ApiUrl";

export const s3Url = process.env.NEXT_PUBLIC_S3_URL

export const productsApi = {
  getAll: `${API_URL}/products`,
  byId: (id: string) => `${API_URL}/products/${id}`,
  bySlug: (slug: string) => `${API_URL}/products/by-slug/${slug}`,
};
