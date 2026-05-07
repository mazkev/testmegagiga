<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans flex flex-col transition-colors duration-300">
        <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
            <HeaderComp />
        </header>

        <div class="flex-grow container mx-auto px-4 py-12">
            <div class="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden transition-colors duration-300">
                <!-- Form Header -->
                <div class="px-10 py-8 border-b border-gray-50 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 flex items-center space-x-4">
                    <div class="p-3 bg-secondary/10 dark:bg-secondary/20 rounded-2xl text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Tambah Supplier</h1>
                        <p class="text-sm text-gray-500 dark:text-gray-400 font-medium italic">Silahkan lengkapi data mitra supplier Anda</p>
                    </div>
                </div>

                <!-- Form Body -->
                <form @submit.prevent="onSubmit" v-if="show" class="p-10 space-y-6">
                    <div class="space-y-1">
                        <label class="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Nama Supplier</label>
                        <input 
                            v-model="form.namaSupplier" 
                            type="text" 
                            required 
                            placeholder="Contoh: PT. Sumber Makmur"
                            class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-gray-50/30 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                        >
                    </div>

                    <div class="space-y-1">
                        <label class="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Alamat Lengkap</label>
                        <textarea 
                            v-model="form.alamat" 
                            required 
                            placeholder="Masukkan alamat lengkap..."
                            rows="3"
                            class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-gray-50/30 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white resize-none"
                        ></textarea>
                    </div>

                    <div class="space-y-1">
                        <label class="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest ml-1">Nomor Telepon</label>
                        <div class="relative group">
                            <span class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold">+62</span>
                            <input 
                                v-model="form.noTelp" 
                                type="text" 
                                required 
                                placeholder="8123456789"
                                class="w-full pl-16 pr-5 py-4 rounded-2xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all bg-gray-50/30 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                            >
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="pt-8 flex flex-col sm:flex-row gap-4">
                        <button 
                            type="submit" 
                            class="flex-grow bg-secondary hover:bg-primary-dark text-white font-black py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Simpan Supplier
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
                namaSupplier: "",
                alamat: "",
                noTelp: "",
            },
            show: true,
        };
    },
    methods: {
        async onSubmit() {
            try {
                storageService.createSupplier(this.form);
                swal("Berhasil!", "Supplier baru telah ditambahkan", "success");
                this.$router.push("/dashboard");
            } catch (error) {
                swal("Gagal!", "Gagal menyimpan data supplier", "error");
            }
        }
    },
};
</script>