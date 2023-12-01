import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("user", {
  signIn: () => ({
    queryKey: ["signIn"],
  }),
  signUp: () => ({
    queryKey: ["signUp"],
  }),
  info: () => ({
    queryKey: ["userInfo"],
  }),
  edit: () => ({
    queryKey: ["edit"],
  }),
});
