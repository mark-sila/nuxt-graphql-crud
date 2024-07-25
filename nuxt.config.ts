// https://nuxt.com/docs/api/configuration/nuxt-config

import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: false },
    
    ssr: false,

    app: {
        layoutTransition: { name: 'layout', mode: 'out-in' }
    },

    modules: [
        'nuxt-graphql-request',
        (_options, nuxt) => {
        nuxt.hooks.hook('vite:extendConfig', (config) => {
            // @ts-expect-error
            config.plugins.push(vuetify({ autoImport: true }))
        })
        },
    ],

    build: {
        transpile: ['vuetify'],
    },

    graphql: {
        clients: {
        auth: {
            endpoint: 'http://localhost/graphql/auth',
        },
        guest: {
            endpoint: 'http://localhost/graphql/guest',
        },
        },
    },

    vite: {
        vue: {
        template: {
            transformAssetUrls,
        },
        },
    },
})
