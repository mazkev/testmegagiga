<template>
    <div class="mb-5">

        <div class="row">
            <HeaderComp />

        </div>
        <div class="container">
            <div class="my-4">
                <h4>Tambah Barang</h4>
            </div>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="border p-4">
                <b-form-group id="input-group-2" label="Nama Barang" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.namaBarang" placeholder="Masukan Nama Barang" required
                        class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-1" label="Harga Barang" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.harga" placeholder="Masukan Harga Barang" required
                        class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Stok Barang" label-for="input-3">
                    <b-form-input id="input-3" v-model="form.stok" placeholder="Masukan Stok Barang" required
                        class="mb-3"></b-form-input>
                </b-form-group>

                <select v-model="form.supplier" id="input-3" class="mb-3 select">
                    <option v-for="data in options" :key="data">{{data.namaSupplier}}</option>
                </select>

                <div class="text-center">
                    <b-button b-col type="submit" variant="primary" class="mx-3">Submit</b-button>
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
                namaBarang: "",
                harga: "",
                stok: "",
                supplier: {},
            },
            totalItems: 1,
            totalPage: 1,
            selected: null,
            options: [],
            show: true,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async onSubmit(event) {
            event.preventDefault();
            const token = localStorage.getItem("token");

            try {
                const data = await axios.post(
                    `http://159.223.57.121:8090/barang/create`,
                    this.form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("inidata", data)
                swal("Succes!", "Data Berhasil Dibuat!", "success");

                
                this.onReset(event);
                this.$router.push("/dashboard");
            } catch (error) {
                alert("data gagal di buat");
            }
        },

        async getData() {
            const token = localStorage.getItem("token");
            
            axios
                .get(`http://159.223.57.121:8090/supplier/find-all?offset=1&limit=948`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log("ini res", res)
                    console.log("ini data 1", res.data);
                    
                    this.totalItems = res.data.total_record;
                    this.totalPage = res.data.total_page;

                    
                    this.options = res.data.data
                    

                    console.log("intem1", this.totalItems)

                    console.log("intem", this.options)
                });
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

<style scoped>
.select {
    width: 100%;
    border: 1px solid #ced4da;
    background-color: white;
    border-radius: 0.375rem;
    padding: 0.375rem 0.75rem;
}
</style>
  