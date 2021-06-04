<template>
    <v-data-table :headers="headers" :search="keyword">
        <template v-slot:top>
            <v-toolbar>
                <v-toolbar-title>Keluhan Nasabah</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer />
                <v-flex xs5 class="text-right">
                    <v-text-field v-model="keyword" append-icon="mdi-search" label="Search" hide-details></v-text-field>
                </v-flex>
                <v-spacer />
                <v-divider class="mx-4" inset vertical></v-divider>

                <v-btn
                depressed
                dark
                rounded
                style="text-transform: none !important;"
                color="blue accent-3"
                @click="dialog=true"
                class="mr-4"
                >
                <v-icon size="10" class="mr-2">mdi-pencil-plus</v-icon>Tambah Keluhan
                </v-btn>
            </v-toolbar>

            <v-dialog v-model="dialog" persistent max-width="600">
                <v-card>
                    <v-card-title>Daftar Keluhan Nasabah</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>

                            <v-col cols="12" >
                                <v-menu
                                v-model="fromDateMenu"
                                :close-on-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-text-field
                                        label="Tanggal dan Waktu"
                                        prepend-icon ="mdi-calendar"
                                        left
                                        :value="fromDateDisp"
                                        v-on="on">
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                    locale="en-in"
                                    v-model="fromDateVal"
                                    no-title
                                    @input="fromDateMenu = false"
                                    :min="minDate"
                                    ></v-date-picker>
                                </v-menu>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-select
                                label="Kantor"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-text-field
                                label="Mekanisme"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-select
                                label="Kategori"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                label="Nomor Kartu"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                label="Nama Nasabah"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                label="Deskripsi"
                                ></v-textarea>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-select
                                label="Petugas"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-select
                                label="Penerima"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="4">
                                <v-select
                                label="Pimpinan"
                                ></v-select>
                            </v-col>
                            </v-row>
                        </v-container>
                        <small>* required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="dialog=false">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog=false">Save</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>
    </v-data-table>
</template>>


<script>
export default {
    computed: {
        fromDateDisp() {
            return this.fromDateVal
        },
    },

    data: () => ({
        keyword: "",
        dialog: false,
        fromDateMenu: false,
        fromDateVal: null,
        minDate: "2020-01-05",
        maxDate: "2019-08-30",
        headers: [
            { text: "ID" },
            { text: "Tanggal" },
            { text: "Kantor" },
            { text: "Mekanisme" },
            { text: "No Kartu" },
            { text: "Nama Nasabah" },
            { text: "Kategori" },
            { text: "Keterangan" },
            { text: "Petugas" },
            { text: "Pemeriksa" },
            { text: "Pimpinan" },
            { text: "Action" }
        ],
    }),
}
</script>