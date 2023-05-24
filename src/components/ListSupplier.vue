<template>
    <div>
        <b-card header="Dashboard" header-bg-variant="info" header-text-variant="primary" no-body
            header-class="header-card" class="shadow">
            <div class="d-flex justify-content-between mt-2 mx-3">
                <h4>Supplier</h4>
                <router-link to="/create-supplier" class="navbar-brand">
                    <button class="btn btn-primary btn-sm" type="submit">
                        Tambah Supplier
                    </button>
                </router-link>
            </div>

            <b-table hover :items="items" :fields="fields" class="table table-bordered text-center"
                :current-page="currentPage" :per-page="page" id="my-table" responsive>

                <template #cell(no)="data">
                    {{ data.index + 1 }}
                </template>
                <template #cell(actions)="item">
                    <b-button type="button" class="btn btn-danger btn-sm"
                        @click="onDelete(item.item.id, item.item.namaSupplier)">
                        Delete
                    </b-button>

                    <router-link :to="{ name: 'UpdateListSupplier', params: { id: item.item.id } }"
                        class="navbar-brand">
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
                "namaSupplier",
                "alamat",
                { key: "noTelp", label: "No. Telp" },

                { key: "actions", label: "Aksi" },
            ],
            items: [],
            currentPage: 1,
            totalItems: 0,
        };
    },
    created() {
        this.getData(this.currentPage);
    },
    methods: {
        async getData(page) {
            const token = localStorage.getItem("token");
            console.log(token)
            console.log("inip", page)
            axios
                .get(`http://159.223.57.121:8090/supplier/find-all?offset=${page}&limit=10`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    console.log("ini res", res)
                    console.log("ini data 1", res.data.data);
                    this.currentPage = res.data.page;
                    // this.perPage = res.data.page;
                    this.totalItems = res.data.total_record;
                    this.items = res.data.data;

                    console.log("intem", this.perPage)
                });
        },
        async onDelete(id, namaSupplier) {
            const token = localStorage.getItem("token");
            try {
                const konfirmasi = confirm(
                    `Apakah kamu yakin ingin menghapus barang ${namaSupplier}?`
                );
                if (konfirmasi) {
                    const data = await axios.delete(
                        `http://159.223.57.121:8090/supplier/delete/${id}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    console.log(data);
                    alert(`Data ${namaSupplier} berhasil hapus`);
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
  