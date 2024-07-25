<template>
    <div>
        <v-toolbar app>
            <v-toolbar-title>
                <v-btn variant="plain" :ripple="false" to="/" active>Todo List - Nuxt GraphQL</v-btn>
            </v-toolbar-title>

            <v-toolbar-items v-if="hasToken" class="mr-4">
                <v-menu location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn dark v-bind="props">
                            {{ name }}
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item @click="logoutAction">
                            <v-list-item-title>
                                Logout
                                <v-icon icon="mdi-logout" end style="float: right;"></v-icon>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
        
    </div>
</template>
<script>
import { gql } from 'nuxt-graphql-request/utils'
import { useNuxtApp } from '#imports'

export default {
    name: 'AppHeader',

    props: ['has-token', 'name'],
    
    data() {
        return {
            
        }
    },

    methods: {
        async logoutAction() {
            const { $graphql } = useNuxtApp()

            const mutation = gql`
                mutation {
                    logoutUser
                }
            `

            await $graphql.auth.request(mutation, {}, {
                Accept: 'application/json',
                Authorization: `Bearer ${this.jwtToken}`,
            }).then(response => {
                document.cookie='token='
                window.location.href = "/login"
            }).catch(err => {
                if (err.response.status == 403) {
                    document.cookie='token='
                    window.location.href = "/login"
                }
            })
        }
    }
};
</script>
<style>

</style>