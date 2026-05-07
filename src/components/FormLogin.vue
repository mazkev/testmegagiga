<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300">
        <div class="max-w-4xl w-full flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-primary/20 border border-gray-100 dark:border-gray-800">
            <!-- Left Side: Branding -->
            <div class="md:w-1/2 bg-gradient-to-br from-primary-dark via-primary to-primary-light p-12 flex flex-col items-center justify-center text-white space-y-6">
                <div class="bg-white/10 backdrop-blur-md p-6 rounded-full animate-pulse">
                    <img src="../assets/logos.png" alt="Marketplace Invent" class="w-48 h-32 object-contain filter brightness-0 invert">
                </div>
                <div class="text-center space-y-2">
                    <h3 class="text-3xl font-bold tracking-tight">Selamat Datang</h3>
                    <h4 class="text-xl font-medium opacity-90 uppercase tracking-widest">Marketplace Invent</h4>
                </div>
                <p class="text-sm text-center text-white/70 max-w-xs">
                    Kelola inventaris barang Anda dengan mudah dan efisien dalam satu platform terpadu.
                </p>
            </div>

            <!-- Right Side: Form -->
            <div class="md:w-1/2 p-12 flex flex-col justify-center">
                <div class="mb-10 text-center md:text-left">
                    <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white">Login</h2>
                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">Masuk ke akun Anda untuk melanjutkan</p>
                </div>

                <form @submit.prevent="onSubmit" v-if="show" class="space-y-6">
                    <div class="space-y-1">
                        <label for="username" class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Username</label>
                        <div class="relative group">
                            <input 
                                id="username"
                                v-model="form.username"
                                type="text"
                                required
                                placeholder="Enter Username"
                                class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 dark:text-white"
                            >
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label for="password" class="text-sm font-semibold text-gray-700 dark:text-gray-300 ml-1">Password</label>
                        <div class="relative group">
                            <input 
                                id="password"
                                v-model="form.password"
                                type="password"
                                required
                                placeholder="Enter Password"
                                class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all duration-200 bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 dark:text-white"
                            >
                        </div>
                    </div>

                    <div class="pt-4 flex flex-col space-y-4">
                        <button 
                            type="submit" 
                            class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-primary/40 flex items-center justify-center space-x-2"
                        >
                            <span>Login</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                        </button>

                        <div class="text-center">
                            <router-link to="/register" class="text-sm font-medium text-primary hover:text-primary-dark transition-colors inline-block group">
                                Belum Punya Akun? <span class="border-b border-transparent group-hover:border-primary">Daftar sekarang</span>
                            </router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import swal from 'sweetalert';
import { storageService } from "@/services/storage";
export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            show: true,
        };
    },
    methods: {
        async onSubmit() {
            try {
                const data = storageService.login(this.form);
                if (data.message === "LOGIN SUCCESS") {
                    swal("Berhasil!", "Login berhasil, selamat datang!", "success");
                    this.$router.push("/dashboard");
                }
            } catch (error) {
                swal("Gagal!", error.message || "Username atau Password salah", "error");
            }
        },
    },
};
</script>

<style scoped>
/* Any additional specific styles can go here, but most is handled by Tailwind */
</style>