<template>
<v-data-table :headers="headers" :search="keyword">
<template v-slot:top>
            <v-toolbar>
                <v-toolbar-title>Aktivasi ATM</v-toolbar-title>
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
                <v-icon size="10" class="mr-2">mdi-pencil-plus</v-icon>Tambah Aktivasi
                </v-btn>
            </v-toolbar>

            <v-dialog v-model="dialog" persistent max-width="500">
                <v-card>
                    <v-card-title>Daftar Aktivasi ATM</v-card-title>
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

                            <v-col cols="12" sm="4">
                                <v-text-field
                                label="Mekanisme"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="7">
                                <v-text-field
                                label="Nama Nasabah"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="5">
                                <v-text-field
                                label="Nomor Kartu"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-select
                                label="Petugas"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-select
                                label="Penerima"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="3">
                                <v-select
                                label="Aktivator"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="3">
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
            { text:"Tanggal" },
            { text:"Nama Nasabah" },
            { text:"Nomor Kartu" },
            { text:"Mekanisme" },
            { text:"Petugas" },
            { text:"Penerima" },
            { text:"Aktivasi" },
            { text:"Pimpinan" },
            { text:"Action" }
        ],
    }),

    methods: {
        getData(){
            var uri = this.$apiUrl + "aktivasi";
            this.$http.get(uri).then(response => {
                this.aktivasi = response.data.problem;
            });
        },

        sendData() {
            this.aktivasi.append('problem', this.form.problem);
            this.aktivasi.append('solution', this.form.solution);
            this.aktivasi.append('description', this.form.description);
            this.aktivasi.append('operator', this.form.operator);
            this.aktivasi.append('corrector', this.form.corrector);
            this.aktivasi.append('supervisor', this.form.supervisor);

            var uri = this.$apiUrl + "aktivasi";
            this.load = true;
            this.$http
            .post(uri, this.problem)
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
            this.aktivasi.append('problem', this.form.problem);
            this.aktivasi.append('solution', this.form.solution);
            this.aktivasi.append('description', this.form.description);
            this.aktivasi.append('operator', this.form.operator);
            this.aktivasi.append('corrector', this.form.corrector);
            this.aktivasi.append('supervisor', this.form.supervisor);

            var uri = this.$apiUrl + `aktivasi/${this.id_problemrecord}` ;
            this.load = true;
            this.$http
            .post(uri, this.aktivasi)
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
            if (confirm("Anda yakin menghapus masalah ini?")){
                uri = this.$apiUrl + "aktivasi/delete/{id_aktivasi}" ;
                this.$http
                .delete(uri, this.aktivasi)
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
            this.id_aktivasi = item.id_aktivasi;
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