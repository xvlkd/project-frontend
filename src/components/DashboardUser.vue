<template>
    <div id="app">
    <v-app>
        <v-app-bar app color="grey darken-4" dark>
            <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
            <v-toolbar-title>BSYMA</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-x top class="text-center">
                <template v-slot:activator = "{ on }">
                    <v-btn v-on="on" icon>
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                        v-for="(menu, index) in menus"
                        link :to="menu.href"
                        :key="index"
                        @click="() => {}"
                    >
                        <v-list-item-title>{{ menu.title }}</v-list-item-title>
                    </v-list-item>
                    </v-list>
                    
            </v-menu>
        </v-app-bar>
        <v-navigation-drawer v-model="sidebarMenu" app floating :permanent="sidebarMenu" :mini-variant.sync="mini" color="grey darken-4">
            <v-list dense>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <v-list-item class="px-2" @click="toggleMini = !toggleMini">
                <v-list-item-avatar color="blue">
                    <v-icon>mdi-account-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content class="text-truncate" > Welcome - {{users.name}}</v-list-item-content>
                <v-btn icon small>
                    <v-icon color="blue">mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
                    <v-list-item-icon>
                        <v-icon color="primary">{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="primary--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <v-container class="px-4 py-0 fill-height" fluid>
                <v-row class="fill-height">
                    <v-col>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <v-footer class="py-3">
            <span class="ml-auto overline">Iatek &copy;2020</span>
        </v-footer>
    </v-app>
</div>
</template>

<script>
import Axios from 'axios'
export default {
    data: () => ({
        loggedIn: localStorage.getItem('loggedIn'),
        token: localStorage.getItem('token'),
        users: [],
        sidebarMenu: true,
        toggleMini: false,
        menus : [
            {
                title: "Account",
                icon: "mdi-human-edit",
                href: "/ResetPassword"
            },
            {
                title: "Log Out",
                icon: "mdi-exit-to-app",
                href: "/"
            }
        ],
        name: "",
        items : [
            {
                title: "Home",
                icon: "mdi-home",
                href: "/dashboard"
            },
            {
                title: "Problem Record",
                icon: "mdi-message-text-outline",
                href: "/ProblemRecord"
            },
            {
                title: "Aktivasi ATM",
                icon: "mdi-check-outline",
                href: "/AktivasiATM"
            },
            {
                title: "Record Keluhan Nasabah",
                icon: "mdi-chat-alert",
                href: "/RecordKelNasabah"
            },
            {
                title: "Relasi Rekening Mencurigakan",
                icon: "mdi-archive-alert",
                href:"/RelasiRekMencurigakan"
            }
        ],
    }),

    created() {
        Axios.get('http://localhost:8000/api/user', {headers: {'Authorization': 'Bearer '+this.token}})
        .then(response => {
            console.log(response)
            this.user = response.data // assign response to state user
        })
    },

    computed: {
      mini() {
          return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
      }
    },

    methods :{
        logout() {
            Axios.get('http://localhost:8000/api/logout')
            .then(() => {
                localStorage.removeItem("loggedIn")
                return this.$router.push({ name: 'LoginPage' })
            })
        }
    }

}
</script>

<style scoped>
    .theme--dark.v-application {
        background-color: #181818;
    }

    .theme--dark.v-card, 
    .theme--dark.v-data-table,
    .theme--dark.v-tabs-items,
    .theme--dark.v-tabs .v-tabs-bar {
        background-color: #232323;
    }

    .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
    }

    .fade-enter-active {
    transition-delay: .25s;
    }

    .fade-enter, .fade-leave-active {
    opacity: 0
    }

    ::-webkit-scrollbar {
        width: 8px;
        background-color: #111;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #222;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #444;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.6);
                box-shadow: inset 0 0 4px rgba(0,0,0,0.6);
        background-color: #333;
    }

    ::-webkit-scrollbar-track:hover {
        background-color: #292929;
    }
</style>