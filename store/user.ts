export const useUser = defineStore("user", () => {
  const isLogin = ref(false);

  return { isLogin };
});
