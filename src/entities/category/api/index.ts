import { API_URL } from "@/src/shared/const";

export const categoryApi = {
  getAll: `${API_URL}/category`,
  byId: (id: string) => `${API_URL}/category/${id}`,
  bySlug: (slug: string) => `${API_URL}/category/by-slug/${slug}`,
};
