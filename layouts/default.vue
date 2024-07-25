<template>
    <div>
        <v-app id="app">
                <Header/>

                <v-container class="mt-200">
                    <v-row no-gutters align="center" justify="center">
                        <v-col cols="12" sm="6">
                            <slot />
                        </v-col>
                    </v-row>
                </v-container>
                
            <Footer />
        </v-app>
    </div>
</template>
<style lang="scss">
#app{
    background-color: #C9DABF !important;

    .mt-200 {
        margin-top: 200px;
    }
}
</style>