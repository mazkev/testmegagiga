<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
        <div class="max-w-4xl w-full flex flex-col md:flex-row-reverse bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all duration-300">
            <!-- Right Side: Branding -->
            <div class="md:w-1/2 bg-gradient-to-tr from-secondary via-primary to-primary-light p-12 flex flex-col items-center justify-center text-white space-y-6">
                <div class="bg-white/10 backdrop-blur-md p-8 rounded-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <h1 class="text-4xl font-black tracking-tighter">Marketplace <span class="text-white/80">Invent</span></h1>
                </div>
                <div class="text-center space-y-2">
                    <h3 class="text-2xl font-bold">Bergabunglah Sekarang</h3>
                    <p class="text-white/70 text-sm">Mulai kelola inventaris Anda dengan sistem yang modern dan terintegrasi.</p>
                </div>
                <div class="grid grid-cols-2 gap-4 w-full max-w-xs pt-4">
                    <div class="bg-white/10 p-3 rounded-xl text-center">
                        <span class="block text-xl font-bold">100%</span>
                        <span class="text-[10px] uppercase tracking-wider opacity-60">Gratis</span>
                    </div>
                    <div class="bg-white/10 p-3 rounded-xl text-center">
                        <span class="block text-xl font-bold">Aman</span>
                        <span class="text-[10px] uppercase tracking-wider opacity-60">Terjamin</span>
                    </div>
                </div>
            </div>

            <!-- Left Side: Form -->
            <div class="md:w-1/2 p-12 flex flex-col justify-center">
                <div class="mb-8">
                    <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Register</h2>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium">Buat akun baru untuk memulai perjalanan Anda</p>
                </div>

                <form @submit.prevent="onSubmit" v-if="show" class="space-y-5">
                    <div class="space-y-1">
                        <label for="username" class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Username</label>
                        <input 
                            id="username"
                            v-model="form.username"
                            type="text"
                            required
                            placeholder="Enter Username"
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                        >
                    </div>

                    <div class="space-y-1">
                        <label for="profileName" class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Profile Name</label>
                        <input 
                            id="profileName"
                            v-model="form.profileName"
                            type="text"
                            required
                            placeholder="Enter Profile Name"
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                        >
                    </div>

                    <div class="space-y-1">
                        <label for="password" class="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                        <input 
                            id="password"
                            v-model="form.password"
                            type="password"
                            required
                            placeholder="Enter Password"
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 dark:text-white"
                        >
                    </div>

                    <div class="pt-6 space-y-4">
                        <button 
                            type="submit" 
                            class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/40 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                        >
                            <span>Daftar Akun</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </button>

                        <div class="text-center">
                            <router-link to="/" class="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                                Sudah Punya Akun? <span class="text-primary underline-offset-4 hover:underline">Login di sini</span>
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import swal from "sweetalert";
import { storageService } from "@/services/storage";
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
                profileName: "",
            },
            show: true,
        };
    },
    methods: {
        async onSubmit() {
            try {
                storageService.register(this.form);
                swal("Berhasil!", "Akun Anda berhasil dibuat. Silahkan login.", "success");
                this.onReset();
                this.$router.push("/");
            } catch (error) {
                swal("Gagal!", error.message || "Gagal membuat akun baru", "error");
            }
        },
        onReset() {
            this.form.username = "";
            this.form.password = "";
            this.form.profileName = "";
            this.show = false;
            this.$nextTick(() => {
                this.show = true;
            });
        },
    },
};
</script>

<style scoped>
</style>