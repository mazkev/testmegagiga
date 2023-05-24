<template>
    <div>
        <div class="row">
            <HeaderComp />

        </div>
        <div class="container">
            <div class="my-4">
                <h4 class="my-auto">Update Supplier</h4>
            </div>
            <b-form @submit="onUpdate" v-if="show" class="border p-4">
                <b-form-group id="input-group-2" label="Nama Supplier:" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.namaSupplier" placeholder="Masukan Nama Supplier" required
                        class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-1" label="Alamat Supplier:" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.alamat" placeholder="Masukan Alamat Supplier" required
                        class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="No. Telp Supplier:" label-for="input-3">
                    <b-form-input id="input-3" v-model="form.noTelp" placeholder="Masukan Nama No. Telp Supplier"
                        required class="mb-3"></b-form-input>
                </b-form-group>

                <div class="text-center">
                    <b-button type="submit" variant="primary" class="mx-3">Update</b-button>
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
import axios from "axios";
import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import swal from "sweetalert";
export default {
    components: {
        FooterComp,
        HeaderComp,

    },
    data() {
        return {
            result: {},
            form: {
                alamat: "",
                namaSupplier: "",
                noTelp: "",
                id: 0,
            },
            show: true,
        };
    },
    mounted() {
        this.onLoad();
    },
    methods: {
        async onLoad() {
            const id = this.$route.params.id;
            const token = localStorage.getItem("token");
            const data = await axios.get(
                `http://159.223.57.121:8090/supplier/find-by-id/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(data);
            const result = await (await data).data.data;
            console.log("ini result", result);
            this.form = result;
        },
        async onUpdate(event) {
            const id = this.$route.params.id;

            event.preventDefault();
            const token = localStorage.getItem("token");
            try {
                const data = await axios.put(
                    `http://159.223.57.121:8090/supplier/update/${id}`,
                    this.form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("ini update", data);
                swal("Succes!", "Data Supplier Berhasil Diupdate!", "success");
                
                this.$router.push("/dashboard");
            } catch (error) {
                alert("data gagal diupdate");
            }
        },
    },
};
</script>
  