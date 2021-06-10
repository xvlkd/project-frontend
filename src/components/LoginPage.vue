<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login BSYMA</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    prepend-icon="mdi-human-male"
                    type="text"
                    v-model="form.username"
                    required
                  />

                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
                    v-model="form.password"
                    required
                    :append-icon="!value ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="value ? 'text' : 'password'"
                    @click:append="value = !value"
                  />

                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
          {{ text }}
          <v-btn dark text @click="snackbar=false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'Login',
  data: () => ({
    form: {
      username: "",
      password: ""
    },
    loggedIn: localStorage.getItem("loggedIn"),
    token: localStorage.getItem("token"),
    snackbar: false,
    color: null,
    text: "",
    users: [],
    user: new FormData(),
    value: false

  }),

  methods: {
    login() {
      if(this.form.username && this.form.password){
        Axios.get('http://localhost:8000/sanctum/csrf-cookie')
         .then(response => {
           console.log(response)
           this.$http.post('login', {
             username: this.form.username,
             password: this.form.password
             }).then(response => {
               console.log(response);
               localStorage.setItem("loggedIn", "true");
               localStorage.setItem("token", response.data.token);
               this.snackbar = true;
               this.color = "green";
               this.text = response.data.messege;
               return this.$router.push({name: "DashboardUser" });
               }).catch(error => {
                 console.log(error);
                 this.errors = error;
                 this.snackbar = true;
                 this.text = "Try Again";
                 this.color = "red";
                 })
            })
       }
    }
  },

  mounted() {
    if (this.loggedIn) {
      return this.$router.push({ name: "DashboardUser" });
      }
      }
      }
</script>