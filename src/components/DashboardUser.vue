<template>
    <div id="app">
    <v-app>
        
        <v-app-bar app color="grey darken-4" dark>     
            <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon>
            <v-toolbar-title>BSYMA</v-toolbar-title>
            <v-spacer></v-spacer>
            
            <v-btn icon @click="logout()">
                <v-icon>mdi-logout</v-icon>
            </v-btn>
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
                    <v-icon>mdi-account</v-icon>
                </v-list-item-avatar>
                <v-list-item-content class="text-truncate" > Welcome <strong> {{ users.name }} </strong> </v-list-item-content>
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
        
        <v-main>
            <v-container class="px-4 py-0 fill-height" fluid>
                <v-row class="fill-height">
                    <v-col>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        
        <v-footer class="py-3">
            <span class="ml-auto overline">vikachu &copy;2021</span>
        </v-footer>

    </v-app>
</div>
</template>

<script>
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
        this.$http.get('user', {headers: {'Authorization': 'Bearer '+this.token}})
        .then(response => {
            console.log(response)
            this.users = response.data // assign response to state user
        })
    },

    computed: {
      mini() {
          return this.$vuetify.breakpoint.smAndDown || this.toggleMini;
      }
    },

    methods :{
        logout() {
            this.$http.post('logout')
            .then(() => {
                localStorage.removeItem( "loggedIn" )
                localStorage.removeItem( "token" )
                this.$router.push({ name: "LoginPage" })
            })
        }
    },

    mounted() {
        if(!this.loggedIn) {
             this.$router.push({ name: "LoginPage" })
        }
    }

}
</script>
