export const getStoreLocal = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item as string) : null;
  }
  return null;
};

export const getStoreLocalString = (name: string) => {
  if (typeof localStorage !== "undefined") {
    const item = localStorage.getItem(name);
    return item ? (item as string) : null;
  }
  return null;
};
