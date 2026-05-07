<template>
    <div class="flex flex-col space-y-4 p-4 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <!-- Profile Card -->
        <div class="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-md">
            <div class="p-6 flex flex-col items-center space-y-4">
                <div class="relative">
                    <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-primary-light flex items-center justify-center text-white shadow-inner p-1">
                        <img 
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                            alt="Profile" 
                            class="w-full h-full rounded-full bg-white dark:bg-gray-800 object-cover"
                        >
                    </div>
                    <div class="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full shadow-sm"></div>
                </div>
                <div class="text-center">
                    <h6 class="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight truncate max-w-[150px]">
                        {{ profileName || 'User' }}
                    </h6>
                    <span class="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Administrator</span>
                </div>
            </div>
            <div class="bg-primary/5 dark:bg-primary/10 px-4 py-2 border-t border-gray-50 dark:border-gray-800 flex justify-center">
                <button @click="logout" class="text-xs font-bold text-primary hover:text-primary-dark transition-colors flex items-center space-x-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                </button>
            </div>
        </div>

        <!-- Navigation Menu -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-2">
            <div class="px-4 py-3 border-b border-gray-50 dark:border-gray-800 mb-2">
                <h3 class="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Navigasi Utama</h3>
            </div>
            <nav class="space-y-1.5">
                <button 
                    @click="$emit('tab-change', 'barang')"
                    :class="[
                        'w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold group',
                        activeTab === 'barang' 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-[1.02]' 
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary dark:hover:text-primary'
                    ]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span>Daftar Barang</span>
                </button>

                <button 
                    @click="$emit('tab-change', 'supplier')"
                    :class="[
                        'w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold group',
                        activeTab === 'supplier' 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-[1.02]' 
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary dark:hover:text-primary'
                    ]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Daftar Supplier</span>
                </button>

                <button 
                    @click="$emit('tab-change', 'history')"
                    :class="[
                        'w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 font-bold group',
                        activeTab === 'history' 
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 transform scale-[1.02]' 
                            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-primary dark:hover:text-primary'
                    ]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Riwayat Transaksi</span>
                </button>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        activeTab: {
            type: String,
            default: 'barang'
        }
    },
    data() {
        return {
            profileName: "",
        };
    },
    created() {
        this.profileName = localStorage.getItem("profileName");
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
</style>
