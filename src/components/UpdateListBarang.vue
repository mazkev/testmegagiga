<template>
    <div>
        <div class="row">
            <HeaderComp />

        </div>

        <div class="container">
            <div class="my-4">
                <h4 class="my-auto">Update Barang</h4>
            </div>
            <b-form @submit="onUpdate" v-if="show" class="border p-4">
                <b-form-group id="input-group-2" label="Judul:" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.namaBarang" placeholder="Masukan Judul Buku" required
                        class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-1" label="Harga:" label-for="input-1">
                    <b-form-input id="input-1" v-model="form.harga" placeholder="Masukan ISBN" required class="mb-3">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Stok:" label-for="input-3">
                    <b-form-input id="input-3" v-model="form.stok" placeholder="Masukan Stok" required
                        class="mb-3"></b-form-input>
                </b-form-group>

                <select v-model="form.supplier" id="input-3" class="mb-3 select">
                    <option v-for="data in options" :key="data">{{data.namaSupplier}}</option>
                </select>

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
                harga: "",
                namaBarang: "",
                stok: "",
                supplier: {},
            },
            options: [],
            show: true,
        };
    },
    mounted() {
        this.onLoad();
        this.getData()
    },
    methods: {
        async onLoad() {
            const id = this.$route.params.id;
            const token = localStorage.getItem("token");
            const data = await axios.get(
                `http://159.223.57.121:8090/barang/find-by-id/${id}`,
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

        async onUpdate(event) {
            const id = this.$route.params.id;

            event.preventDefault();
            const token = localStorage.getItem("token");
            try {
                const data = await axios.put(
                    `http://159.223.57.121:8090/barang/update/${id}`,
                    this.form,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("ini update", data);
                swal("Succes!", "Data Barang Berhasil Diupdate!", "success");

                
                this.$router.push("/dashboard");
            } catch (error) {
                alert("data gagal diupdate");
            }
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
  