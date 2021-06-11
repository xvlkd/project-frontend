<template>
<v-data-table :headers="headers" :search="keyword">
<template v-slot:top>
            <v-toolbar>
                <v-toolbar-title>Relasi Rekening Mencurigakan</v-toolbar-title>
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
                <v-icon size="10" class="mr-2">mdi-pencil-plus</v-icon>Tambah Relasi
                </v-btn>
            </v-toolbar>

            <v-dialog v-model="dialog" persistent max-width="600">
                <v-card>
                    <v-card-title>Daftar Relasi</v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>

                            <v-col cols="12" sm="6">
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

                            <v-spacer></v-spacer>

                            <v-col cols="12" sm="6">
                                <v-select
                                label="Kategori"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                label="Nomor Kartu 1"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                label="Nomor Kartu 2"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                label="Nomor Rekening 1"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-text-field
                                label="Nomor Rekening 2"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
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
            { text: "No" },
            { text: "Tanggal" },
            { text: "Kategori" },
            { text: "Mekanisme" },
            { text: "No Kartu" },
            { text: "Nama Nasabah" },
            { text: "Keterangan" },
            { text: "Petugas" },
            { text: "Pemeriksa" },
            { text: "Pimpinan" },
            { text: "Action" }
        ],
        relasirek: new FormData(),
        relasireks: [],
        token: localStorage.getItem('token'),
        typeInput: "new",
        load :false,
    }),

    methods: {
        getData(){
            var config = {
                headers: {'Authorization': 'Bearer '+ localStorage.getItem('token')}
            }
            var uri = this.$apiUrl + 'relasirek';
            this.$http.get(uri, config).then(response => {
                this.keluhans = response.data.message
            });
        },

        sendData() {
            this.relasirek.append('problem', this.form.problem);
            this.relasirek.append('solution', this.form.solution);
            this.relasirek.append('description', this.form.description);
            this.relasirek.append('operator', this.form.operator);
            this.relasirek.append('corrector', this.form.corrector);
            this.relasirek.append('supervisor', this.form.supervisor);

            var config = {
                headers: {'Authorization': 'Bearer' +localStorage.getItem('token')}
            }

            var uri = this.$apiUrl + "relasirek";
            this.load = true;
            this.$http
            .post(uri, this.problem, config)
            .then(response => {
                this.snackbar = true;
                this.color = "green";
                this.text = response.data.message;
                this.load =false;
                this.dialog = false;
                this.getData();
                this.resetForm();
            })
            .catch(error => {
                this.errors = error;
                this.snackbar = true;
                this.text = "Try Again";
                this.color = "red";
                this.load = false;
            })
        },

        updateData() {
            this.relasirek.append('problem', this.form.problem);
            this.relasirek.append('solution', this.form.solution);
            this.relasirek.append('description', this.form.description);
            this.relasirek.append('operator', this.form.operator);
            this.relasirek.append('corrector', this.form.corrector);
            this.relasirek.append('supervisor', this.form.supervisor);

            var config = {
                headers: { 'Authorization' :'Bearer' +localStorage.getItem('token')}
            }

            var uri = this.$apiUrl + `relasirek/${this.id_problemrecord}`;
            this.load = true;
            this.$http
            .post(uri, this.relasirek, config)
            .then(response => {
                this.snackbar = true;
                this.color = "green";
                this.text = response.data.message;
                this.load = false;
                this.dialog = false;
                this.getData();
                this.resetForm();
                this.typeInput = "new";
            })
            .catch(error => {
                this.errors = error;
                this.snackbar = true;
                this.text = "Try Again";
                this.color = "red";
                this.load = false;
                this.dialog = false;
                this.typeInput = "new";
            })
        },

        deleteData() {
            var uri;
            var config = {
                headers: { 'Authorization' :'Bearer' +localStorage.getItem('token')}
            }
            if (confirm("Anda yakin menghapus masalah ini?")){
                uri = this.$apiUrl + "relasirek/delete/{id_keluhan}" ;
                this.$http
                .delete(uri, this.relasirek, config)
                .then(response =>{
                this.snackbar = true;
                this.text = response.data.status;
                this.color = "green";
                this.getData();
                })
                .catch(error => {
                    this.errors = error;
                    this.snackbar = true;
                    this.text = "Try Again";
                    this.color = "red";
                });
            } else {
                this.snackbar = true;
                this.text = "Gagal diHapus";
                this.color = "red";
            }
        },

        editHandler(item) {
            this.typeInput = "edit";
            this.dialog = true;
            this.id_problemrecord = item.id_problemrecord;
            this.problem = item.problem;
            this.solution = item.solution;
            this.description = item.solution;
            this.operator = item.operator;
            this.corrector = item.corrector;
            this.supervisor = item.supervisor;
        },

        setForm() {
            if (this.typeInput === "new") {
                this.sendData();
                this.dialog = false;
            } else {
                this.updateData();
                this.dialog = false;
            }
        },

        resetForm() {
            this.form = {
                problem: "",
                solution: "",
                description: "",
                operator: "",
                corrector: "",
                supervisor: ""
            };
        },
    },
    

    mounted() {
        this.getData();
    }
}
</script>