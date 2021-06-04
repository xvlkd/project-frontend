<template>
  <v-app id="inspire">
    <v-content>
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
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    form: {
      username: "",
      password: ""
    },
    snackbar: false,
    color: null,
    text: "",
    users: [],
    user: new FormData(),
    value: false
  }),

  methods: {
    login() {
      this.user.append("username", this.form.username);
      this.user.append("password", this.form.password);
      var uri = this.$apiUrl + "login";
      this.$http
        .post(uri, this.user)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar

          this.$session.start();
          this.$router.push({ name: "DashboardUser"});

        })
        .catch(error => {
          console.log("err", error);
          this.errors = error;
          this.snackbar = true;
          this.text = "Try Again";
          this.color = "red";
        });
    }
  }
};
</script>