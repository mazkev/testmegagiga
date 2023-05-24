<template>
    <div>
        <b-card header="Dashboard" header-bg-variant="info" header-text-variant="primary" no-body
            header-class="header-card" class="shadow">
            <div class="d-flex justify-content-between mt-2 mx-3">
                <h4>Barang</h4>
                <router-link to="/create-barang" class="navbar-brand">
                    <button class="btn btn-primary btn-sm" type="submit">
                        Tambah Barang
                    </button>
                </router-link>
            </div>

            <b-table hover :items="items" :fields="fields" class="table table-bordered text-center"
                :current-page="currentPage" :per-page="page" id="my-table" responsive>

                <template #cell(no)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(namaSupplier)="data">
                    {{ data.item.supplier.namaSupplier }}
                </template>
                <template #cell(alamatSupplier)="data">
                    {{ data.item.supplier.alamat }}
                </template>
                <template v-slot:[`no.TelpSupplier`]="{data}">
                    {{ data.item.supplier.noTelp }}
                </template>
                <template #cell(actions)="item">
                    <b-button type="button" class="btn btn-danger btn-sm"
                        @click="onDelete(item.item.id, item.item.namaBarang)">
                        Delete
                    </b-button>

                    <router-link :to="{ name: 'UpdateListBarang', params: { id: item.item.id } }" class="navbar-brand">
                        <button type="button" class="btn btn-warning btn-sm mx-2 my-1">
                            Update
                        </button>
                    </router-link>

                </template>
            </b-table>
            <b-pagination v-model="currentPage" :total-rows="totalItems" :per-page="page" aria-controls="my-table"
                @change="getData" align="right">
            </b-pagination>
        </b-card>

    </div>
</template>
  
<script>


import axios from "axios";
export default {
    data() {
        return {
            fields: [
                "no",
                "namaBarang",
                "stok",
                "harga",
                "namaSupplier",
                "alamatSupplier",
                "no.TelpSupplier",
                { key: "actions", label: "Aksi" },
            ],
            items: [],
            currentPage: 1,
            totalItems: 1,
        };
    },
    created() {
        this.getData(this.currentPage);
    },
    
    methods: {
        async getData(page) {
            const token = localStorage.getItem("token");
            console.log(token)
            
            axios
                .get(`http://159.223.57.121:8090/barang/find-all?offset=${page}&limit=10`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log("ini res", res)
                    console.log("ini data 1", res.data.data);
                    this.currentPage = res.data.page;
                    this.totalItems = res.data.total_record;
                    // this.page = res.data.limit;
                    this.items = res.data.data;

                    console.log("intem", this.perPage)
                });
        },
        async onDelete(id, namaBarang) {
            const token = localStorage.getItem("token");
            try {
                const konfirmasi = confirm(
                    `Apakah kamu yakin ingin menghapus barang ${namaBarang}?`
                );
                if (konfirmasi) {
                    const data = await axios.delete(
                        `http://159.223.57.121:8090/barang/delete/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(data);
                    alert("data hapus berhasil");
                    this.getData(this.currentPage);
                }
            } catch (error) {
                alert("data gagal di hapus");
            }
        },
    },
};
</script>

<style scoped>
.header-card {
    font-size: 24px;
}
</style>
  