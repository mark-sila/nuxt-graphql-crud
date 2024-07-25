<template>
    <div>
        <v-app id="app">
            <Header :has-token="hasToken" :name="userName"/>

            <v-container :class="marginTop">
                <v-row no-gutters align="center" justify="center">
                    <v-col cols="12" sm="6">
                        <slot/>
                    </v-col>
                </v-row>
            </v-container>
        </v-app>
    </div>
</template>
<script>
export default {
    props: ['hasToken', 'userName'],

    computed: {
        marginTop() {
            return this.hasToken ? 'mt-100' : 'mt-200'
        }
    }
}
</script>
<style lang="scss">
#app {
    .mt-100 {
        margin-top: 100px;
    }

    .mt-200 {
        margin-top: 200px;
    }
}
</style>