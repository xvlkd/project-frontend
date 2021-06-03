<template>
    <div id="app">
        <v-app id="inspire">
            <v-form
            ref="form"
            lazy-validation
            >
            <v-col cols="6">
                <v-text-field
                    label="Current Password"
                    required
                ></v-text-field>
            </v-col>
        
            <v-col cols="6">
                <v-text-field
                    label="New Password"
                    required
                ></v-text-field>
            </v-col>

            <v-col cols="6">
                <v-text-field
                    label="Confirm Password"
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

