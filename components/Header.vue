<template>
  <div>
    <v-app-bar flat color="#C9DABF">
        <v-container>
            <v-app-bar-title color="#fff">Todo List - Nuxt Apollo</v-app-bar-title>
        </v-container>
    </v-app-bar>
  </div>
</template>
<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            appTitle: 'Awesome App',
            sidebar: false,
            menuItems: [
                { title: 'Home', path: '/home', icon: 'home' },
                { title: 'Sign Up', path: '/signup', icon: 'face' },
                { title: 'Sign In', path: '/signin', icon: 'lock_open' }
            ]
        }
    },
};
</script>
<style>

</style>