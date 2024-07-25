<template>
    <div>
        <v-text-field
            v-model="form.newTask"
            :loading="submitTaskLoading"
            append-inner-icon="mdi-plus"
            label="New Task"
            variant="solo"
            v-on:keyup.enter="addTaskAction"
            @click:append-inner="addTaskAction"
        >
        </v-text-field>
        <v-card>
            <v-tabs
                v-model="tab"
                align-tabs="center"
                color="deep-purple-accent-4"
                grow
            >
                <v-tab value="pending">
                    <v-badge :content="pendingTaskItems.length" floating color="deep-purple-accent-4">Todo List</v-badge>
                </v-tab>
                <v-tab value="done">
                    <v-badge :content="completeTaskItems.length" floating color="deep-purple-accent-4">Task Complete</v-badge>
                </v-tab>
            </v-tabs>

            <v-tabs-window v-model="tab">
                <v-tabs-window-item value="pending" class="px-6 py-6">
                    <v-list lines="two" select-strategy="classic" v-model:selected="selectedTask" :items="pendingTaskItems">
                        <template v-slot:prepend="{ isActive }">
                            <v-list-item-action start>
                                <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                            </v-list-item-action>
                        </template>
                    </v-list>
                    <template v-if="pendingTaskItems.length >= 1">
                        <v-divider></v-divider>
                        <v-container>
                            <v-row no-gutters>
                                <v-hover>
                                    <template v-slot:default="{ isHovering, props }">
                                        <v-col align-self="start" @click="completeTaskAction">
                                            <v-card
                                                block
                                                :class="{ 'on-hover': isHovering }"
                                                :elevation="isHovering ? 10 : 0"
                                                v-bind="props"
                                                link
                                                min-height="50"
                                                title="Complete"
                                                color="success"
                                                tile
                                                style="text-align: center"
                                            >
                                            </v-card>
                                        </v-col>
                                    </template>
                                </v-hover>
                                <v-hover>
                                    <template v-slot:default="{ isHovering, props }">
                                        <v-col align-self="start" @click="deleteTaskAction">
                                            <v-card
                                                block
                                                :class="{ 'on-hover': isHovering }"
                                                :elevation="isHovering ? 10 : 0"
                                                v-bind="props"
                                                link
                                                min-height="50"
                                                title="Remove"
                                                color="red"
                                                tile
                                                style="text-align: center"
                                                append-icon="mdi-trash"
                                            >
                                            </v-card>
                                        </v-col>
                                    </template>
                                </v-hover>
                            </v-row>
                        </v-container>
                    </template>
                    <template v-else>
                        <p class="text-center text-subtitle-1">No Data Available</p>
                    </template>
                </v-tabs-window-item>
                <v-tabs-window-item value="done" class="px-6 py-6">
                    <v-list lines="two" select-strategy="classic" v-model:selected="selectedTask" :items="completeTaskItems">
                        <template v-slot:prepend="{ isActive }">
                            <v-list-item-action start>
                                <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                            </v-list-item-action>
                        </template>
                    </v-list>
                    <template v-if="completeTaskItems.length >= 1">
                        <v-divider></v-divider>
                        <v-container>
                            <v-row no-gutters>
                                <v-hover>
                                    <template v-slot:default="{ isHovering, props }">
                                        <v-col align-self="start" @click="deleteTaskAction">
                                            <v-card
                                                block
                                                :class="{ 'on-hover': isHovering }"
                                                :elevation="isHovering ? 10 : 0"
                                                v-bind="props"
                                                link
                                                min-height="50"
                                                title="Remove"
                                                color="red"
                                                tile
                                                style="text-align: center"
                                                append-icon="mdi-trash"
                                            >
                                            </v-card>
                                        </v-col>
                                    </template>
                                </v-hover>
                            </v-row>
                        </v-container>
                    </template>
                    <template v-else>
                        <p class="text-center text-subtitle-1">No Data Available</p>
                    </template>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card>
    </div>
</template>

<script>
import { gql } from 'nuxt-graphql-request/utils'
import { useNuxtApp } from '#imports'
definePageMeta({
    middleware: ["auth"]
})
export default {
    props: ['jwtToken', 'userId'],

    data() {
        return {
            submitTaskLoading: false,
            tab: '',
            selectedTask: [],
            form: {
                newTask: ''
            },
            tasks: []
        }
    },

    computed: {
        pendingTaskItems() {
            return this.tasks.filter(task => task.status == 'pending').map(task => {
                return {
                    title: task.name,
                    value: task.id
                }
            })
        },
        completeTaskItems() {
            return this.tasks.filter(task => task.status == 'done').map(task => {
                return {
                    title: task.name,
                    value: task.id
                }
            })
        }
    },

    created() {
        this.getUserDetail()
    },

    methods: {
        async getUserDetail() {
            const { $graphql } = useNuxtApp()

            const query = gql`
                query {
                    userQuery {
                        tasks {
                            id 
                            name 
                            status
                        }
                    }
                }
            `

            await $graphql.auth.request(query, {}, {
                Accept: 'application/json',
                Authorization: `Bearer ${this.jwtToken}`,
            }).then(response => {
                this.tasks = response.userQuery.tasks
            }).catch(err => {
                if (err.response.status == 403) {
                    document.cookie='token='
                    window.location.href = "/login"
                }
            })
        },

        async addTaskAction() {
            if (this.form.newTask == '') return

            this.submitTaskLoading = true

            const { $graphql } = useNuxtApp()

            const mutation = gql`
                mutation {
                    createTask(name: "${this.form.newTask}", user_id: ${this.userId}, status: "pending" ) {
                        id
                        name
                        status
                    }
                }
            `

            await $graphql.auth.request(mutation, {}, {
                Accept: 'application/json',
                Authorization: `Bearer ${this.jwtToken}`,
            }).then(response => {
                let data = response.createTask

                this.tasks.push(data)
                this.form.newTask = ''
                this.submitTaskLoading = false
            }).catch(err => {
                if (err.response.status == 403) {
                    document.cookie='token='
                    window.location.href = "/login"
                }
            })
        },

        completeTaskAction() {
            const { $graphql } = useNuxtApp()

            this.tasks = this.tasks.map((task) => {
                if (this.selectedTask.includes(task.id)) {
                    return {
                        ...task,
                        status: "done",
                    };
                }
                return task;
            })

            this.selectedTask.forEach(task_id => {
                const mutation = gql`
                    mutation {
                        updateTask(id: ${task_id},  status: "done" ) {
                            id
                            name
                            status
                        }
                    }
                `

                $graphql.auth.request(mutation, {}, {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.jwtToken}`,
                }).then(response => {
                    let data = response.updateTask

                    // this.tasks.push(data)
                }).catch(err => {
                    if (err.response.status == 403) {
                        document.cookie='token='
                        window.location.href = "/login"
                    }
                })
            })

            this.selectedTask = []
        },

        deleteTaskAction() {
            const { $graphql } = useNuxtApp()

            this.tasks = this.tasks.filter(task => !this.selectedTask.includes(task.id))

            this.selectedTask.forEach(task_id => {
                const mutation = gql`
                    mutation {
                        deleteTask(id: ${task_id})
                    }
                `

                $graphql.auth.request(mutation, {}, {
                    Accept: 'application/json',
                    Authorization: `Bearer ${this.jwtToken}`,
                }).then(response => {

                }).catch(err => {
                    if (err.response.status == 403) {
                        document.cookie='token='
                        window.location.href = "/login"
                    }
                })
            })

            this.selectedTask = []
        }
    }
}
</script>
<style lang="scss">

</style>
