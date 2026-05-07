<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans flex flex-col transition-colors duration-300">
        <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
            <HeaderComp />
        </header>

        <div class="flex-grow container mx-auto px-4 py-12">
            <div class="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                <!-- Form Header -->
                <div class="px-10 py-8 border-b border-gray-50 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 flex items-center space-x-4">
                    <div class="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-9-4h18c.552 0 1 .448 1 1v10c0 .552-.448 1-1 1H3c-.552 0-1-.448-1-1V7c0-.552.448-1 1-1z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Tambah Barang Baru</h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Silahkan lengkapi detail barang di bawah ini</p>
                    </div>
                </div>

                <!-- Form Body -->
                <form @submit.prevent="onSubmit" v-if="show" class="p-10 space-y-6">
                    <div class="space-y-1 group">
                        <label class="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Nama Barang</label>
                        <input 
                            v-model="form.namaBarang" 
                            type="text" 
                            required 
                            placeholder="Contoh: Laptop MacBook Pro"
                            class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50/30 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                        >
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-1">
                            <label class="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Harga (Rp)</label>
                            <input 
                                v-model="form.harga" 
                                type="number" 
                                required 
                                placeholder="0"
                                class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50/30 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                            >
                        </div>
                        <div class="space-y-1">
                            <label class="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Stok</label>
                            <input 
                                v-model="form.stok" 
                                type="number" 
                                required 
                                placeholder="0"
                                class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50/30 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                            >
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Pilih Supplier</label>
                        <div class="relative">
                            <select 
                                v-model="form.supplier" 
                                required
                                class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50/30 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white appearance-none cursor-pointer"
                            >
                                <option value="" disabled class="dark:bg-gray-800">Pilih Supplier...</option>
                                <option v-for="data in options" :key="data.id" :value="data" class="dark:bg-gray-800">
                                    {{ data.namaSupplier }}
                                </option>
                            </select>
                            <div class="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 dark:text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="pt-8 flex flex-col sm:flex-row gap-4">
                        <button 
                            type="submit" 
                            class="flex-grow bg-primary hover:bg-primary-dark text-white font-black py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Simpan Barang
                        </button>
                        <router-link to="/dashboard" class="sm:w-1/3">
                            <button 
                                type="button"
                                class="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold py-4 px-8 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                            >
                                Batal
                            </button>
                        </router-link>
                    </div>
                </form>
            </div>
        </div>

        <footer class="mt-auto bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <FooterComp />
        </footer>
    </div>
</template>
  
<script>
import swal from 'sweetalert';
import { storageService } from "@/services/storage";
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
                supplier: "",
            },
            options: [],
            show: true,
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async onSubmit() {
            try {
                storageService.createBarang(this.form);
                swal("Berhasil!", "Barang baru telah ditambahkan", "success");
                this.$router.push("/dashboard");
            } catch (error) {
                swal("Gagal!", "Gagal menyimpan data barang", "error");
            }
        },
        async getData() {
            const res = storageService.getSuppliers(1, 999);
            this.options = res.data;
        }
    },
};
</script>