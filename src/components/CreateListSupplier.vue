<template>
    <div class="mb-5">

        <div class="row">
            <HeaderComp />

        </div>
        <div class="container">
            <div class="my-4">
                <h4>Tambah Supplier</h4>
            </div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="border p-4">
                <b-form-group id="input-group-2" label="Nama Supplier" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.namaSupplier" placeholder="Masukan Nama Supplier" required
                        class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-1" label="Alamat Supplier" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.alamat" placeholder="Masukan Alamat Supplier" required
                        class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="No. Telp Supplier" label-for="input-3">
                    <b-form-input id="input-3" v-model="form.noTelp" placeholder="Masukan No. Telp Supplier" required
                        class="mb-3"></b-form-input>
                </b-form-group>


                <div class="text-center">
                    <b-button b-col type="submit" variant="primary" class="mx-3">Submit</b-button>
                    <!-- <b-button b-col type="reset" variant="danger" class="mx-3">Reset</b-button> -->
                    <router-link to="/dashboard" class="navbar-brand">
                        <b-button variant="success" class="mx-3">Kembali</b-button>
                    </router-link>
                </div>
            </b-form>
        </div>
        <div class="row fixed-bottom">
            <FooterComp />
        </div>
    </div>

</template>
  
<script>
import swal from 'sweetalert';
import axios from "axios";
import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
export default {
    components: {
        FooterComp,
        HeaderComp,

    },
    data() {
        return {
            form: {
                namaSupplier: "",
                alamat: "",
                noTelp: "",
                id: 0,
            },
            show: true,
        };
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            const token = localStorage.getItem("token");

            try {
                const data = await axios.post(
                    `http://159.223.57.121:8090/supplier/create`,
                    this.form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("inidata", data)
                swal("Success!", "Data Supplier Berhasil DiTambahkan!", "success");

                
                this.onReset(event);
                this.$router.push("/dashboard");
            } catch (error) {
                alert("data gagal di buat");
            }
        },

        onReset(event) {
            event.preventDefault();
        
            this.form.namaSupplier = "";
            this.form.alamat = "";
            this.form.noTelp = "";

            
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
    },
};
</script>
  