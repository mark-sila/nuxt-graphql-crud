<template>
    <v-sheet class="mx-auto" width="400">
        <v-card
            class="mx-auto py-4"
            width="400"
            elevation="10"
        >
            <template v-slot:title>
                <p class="font-weight-black text-center text-h6 text-uppercase">Login your Account</p>
            </template>

            <v-card-text>
                <v-form fast-fail @submit.prevent="submitForm" class="mt-4 px-4 py-4">
                    <div class="text-subtitle-1 text-medium-emphasis">Account</div>

                    <v-text-field
                        class="mb-2"
                        v-model="form.emailAddress"
                        :rules="[rules.email.required, rules.email.valid]"
                        type="email"
                        density="comfortable"
                        label="Email address"
                        placeholder="johndoe@example.com"
                        prepend-inner-icon="mdi-email-outline"
                        variant="solo"
                        hide-details="auto"
                        @click:clear="form.emailAddress = ''"
                    ></v-text-field>

                    <div class="text-subtitle-1 text-medium-emphasis">Password</div>

                    <v-text-field
                        class="mb-2"
                        v-model="form.password"
                        :rules="[rules.password.required]"
                        :type="showPassword ? 'text' : 'password'"
                        density="comfortable"
                        placeholder="Password"
                        prepend-inner-icon="mdi-lock"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        variant="solo"
                        hide-details="auto"
                        @click:append-inner="showPassword = !showPassword"
                    ></v-text-field>

                    <v-btn 
                        class="mt-6"
                        type="submit" 
                        block
                        elevation="10"
                        height="45"
                        color="indigo-darken-1"
                        :loading="loading"
                    >
                        Submit
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script>

export default {
    data() {
        return {
            loading: false,
            showPassword: false,
            form: {
                emailAddress: '',
                password: ''
            },
            rules: {
                email: {
                    required: value => !!value || 'The email address field is required.',
                    valid: value => {
                        if (value != "") {
                            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            return pattern.test(value) || 'The email address is invalid.'
                        }
                    },
                },
                password: {
                    required: value => !!value || 'The password field is required.',
                    
                }
            }
        }
    },

    methods: {
        submitForm() {
            this.loading = true
            const query = gql`asdasdasd`
        }
    }
}
</script>
<style lang="scss">

</style>
