const isLogin = () => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token") ? true : false;
  }
};

export default defineNuxtRouteMiddleware((to, from) => {
  console.log(1, "router", to, isLogin());
  if (to.path === "/login") {
    return;
  } else if (isLogin()) {
    if (to.path === "/login") {
      return navigateTo("/");
    }
    return;
  } else {
    return navigateTo("/login");
  }
});
