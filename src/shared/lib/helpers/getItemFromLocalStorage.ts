export const getItemFromLocalStorage = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item as string) : null;
  }
  return null;
};

export const getStringFromLocalStorage = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(name);
    return item ? (item as string) : null;
  }
  return null;
};
