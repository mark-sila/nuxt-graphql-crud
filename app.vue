<template>
  <div>
    <client-only>
        <NuxtLayout 
            :has-token="hasToken"
            :user-name="user.name"
        >
            <NuxtPage :tasks="user.tasks" :jwt-token="this.jwtToken" :user-id="user.id"/>
        </NuxtLayout>
    </client-only>
  </div>
</template>
<script>
import { gql } from 'nuxt-graphql-request/utils'
import { useNuxtApp } from '#imports'

export default {
    data() {
        return {
            user: {
                id: '',
                name: ''
            }
        }
    },

    computed: {
        hasToken() {
            return useCookie('token').value != undefined && useCookie('token').value != ''
        },

        jwtToken() {
            return useCookie('token').value
        }
    },

    methods: {
        async getUserDetail() {
            const { $graphql } = useNuxtApp()

            const query = gql`
                query {
                    userQuery{
                        id
                        name 
                    }
                }
            `

            await $graphql.auth.request(query, {}, {
                Accept: 'application/json',
                Authorization: `Bearer ${this.jwtToken}`,
            }).then(response => {
                this.user = response.userQuery
            }).catch(err => {
                if (err.response.status == 403) {
                    document.cookie='token='
                    window.location.href = "/login"
                }
            })
        }
    },

    mounted() {
        if (this.hasToken) {
            this.getUserDetail()
        }
    }
}
</script>
<style lang="scss">

</style>