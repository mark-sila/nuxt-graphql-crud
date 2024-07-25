export default defineNuxtRouteMiddleware((to, from) => {
    if (useCookie('token').value != undefined && useCookie('token').value?.trim().length != 0) {
        return navigateTo('/')
    }
})