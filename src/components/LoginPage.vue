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
                    required
                  />
                  <v-text-field
                    label="Password"
                    prepend-icon="mdi-lock"
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

