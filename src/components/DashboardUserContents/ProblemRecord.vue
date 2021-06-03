<template>
    <v-data-table :headers="headers" :search="keyword" :items="problems">
        <template v-slot:top>
            <v-toolbar>
                <v-toolbar-title>Problem Record</v-toolbar-title>
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
                <v-icon size="10" class="mr-2">mdi-pencil-plus</v-icon>Tambah Masalah
                </v-btn>

                
            </v-toolbar>

            <v-dialog v-model="dialog" persistent max-width="750">
                <v-card>
                    <v-card-title>Masalah</v-card-title>
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
                                        v-model="form.created_at"
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

                            <v-col cols="12" sm="6">
                                <v-select
                                label="Kategori"
                                v-model="form.category"
                                ></v-select>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                label="Masalah*"
                                v-model="form.problem"
                                required
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                label="Solusi"
                                v-model="form.solution"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-textarea
                                label="Deskripsi"
                                v-model="form.description"
                                ></v-textarea>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-select
                                label="Petugas"
                                v-model="form.operator"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-select
                                label="Pemeriksa"
                                v-model="form.corrector"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" sm="6">
                                <v-select
                                label="Pimpinan"
                                v-model="form.supervisor"
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
        <template v-slot:[`item.actions`] ="{ item }">
            <v-icon color="indigo" class="mr-2" @click="editHandler(item)" >mdi-pencil</v-icon>
            <v-icon color="error" @click="deleteData(item.id_problemrecord)">mdi-delete</v-icon>
        </template>
    </v-data-table>
</template>

<script>
export default {
    computed: {
        fromDateDisp() {
            return this.fromDateVal
        },
    },

    data: () => ({
        keyword: "",
        dialog:false,
        fromDateMenu: false,
        fromDateVal: null,
        minDate: "2020-01-05",
        maxDate: "2019-08-30",
        headers: [
            {
                title:"No",
                value: "id_problemrecord"
            },
            {
                title:"Tanggal",
                value:"created_at"
            },
            {
                title:"Masalah",
                value:"problem"
            },
            {
                title:"Solusi",
                value:"solution"
            },
            {
                title:"Deskripsi",
                value:"description"

            },
            {
                title:"Petugas",
                value:"operator"
            },
            {
                title:"Pemeriksa",
                value:"corrector"
            },
            {
                title:"Pimpinan",
                value:"supervisor"
            },
            {
                title:"Action",
                value: "actions",
                sortable:false,
            }
        ],
        form: {
            problem: "",
            solution: "",
            description: "",
            operator:"",
            corrector:"",
            supervisor:"",
        },
        problems: new FormData(),
        typeInput: "new"
    }),

    methods: {
        getData(){
            var uri = this.$apiUrl + "problems";
            this.$http.get(uri, this.problems).then(response => {
                this.problems = response.data.problems;
            });
        },

        sendData() {
            this.problems.append('problem', this.form.problem);
            this.problems.append('solution', this.form.solution);
            this.problems.append('description', this.form.description);
            this.problems.append('operator', this.form.operator);
            this.problems.append('corrector', this.form.corrector);
            this.problems.append('supervisor', this.form.supervisor);

            var uri = this.$apiUrl + "problem";
            this.load = true;
            this.$http.post(uri, this.problem).then(this.getData())
        },

        updateData() {
            this.problems.append('problem', this.form.problem);
            this.problems.append('solution', this.form.solution);
            this.problems.append('description', this.form.description);
            this.problems.append('operator', this.form.operator);
            this.problems.append('corrector', this.form.corrector);
            this.problems.append('supervisor', this.form.supervisor);

            var uri = this.$apiUrl + "problems/update/" + this.id_problemrecord;
            this.load = true;
            this.$http.post(uri, this.problems).then(this.getData(), this.resetForm(), this.load = false,);
        },

        deleteData(id_problemrecord) {
            var uri = this.$apiUrl + "problems" + id_problemrecord;
            this.$http.delete(uri, this.problems).then(this.getData(), this.resetForm(), this.load = false,)
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