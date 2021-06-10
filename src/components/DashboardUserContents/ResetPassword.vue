<template>
    <div id="app">
        <v-app id="inspire">
            <v-form
            ref="form"
            lazy-validation
            >
            <v-col cols="6">
                <v-text-field
                    label="Password Sebelumnya"
                    required
                ></v-text-field>
            </v-col>
        
            <v-col cols="6">
                <v-text-field
                    label="Password Baru"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="6">
                <v-text-field
                    label="Masukkan Password Kembali"
                    required
                ></v-text-field>
            </v-col>
        
            <v-btn
                color="error"
            >
                Reset Password
            </v-btn>
            </v-form>
        </v-app>
    </div>
</template>

