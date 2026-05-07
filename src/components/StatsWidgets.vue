<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-colors duration-300">
        <!-- Total Items -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <div class="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-600 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <span class="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 dark:bg-blue-500/20 px-2 py-1 rounded-lg">Items</span>
            </div>
            <div class="mt-4">
                <h3 class="text-3xl font-black text-gray-900 dark:text-white">{{ stats.totalItems }}</h3>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Total Produk</p>
            </div>
        </div>

        <!-- Total Value -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <div class="p-3 bg-green-50 dark:bg-green-500/10 rounded-2xl text-green-600 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <span class="text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-50 dark:bg-green-500/20 px-2 py-1 rounded-lg">Value</span>
            </div>
            <div class="mt-4">
                <h3 class="text-2xl font-black text-gray-900 dark:text-white">Rp {{ formatCurrency(stats.totalValue) }}</h3>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Estimasi Nilai Stok</p>
            </div>
        </div>

        <!-- Low Stock -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <div class="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-2xl text-orange-600 dark:text-orange-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <span class="text-[10px] font-black text-orange-500 uppercase tracking-widest bg-orange-50 dark:bg-orange-500/20 px-2 py-1 rounded-lg">Warning</span>
            </div>
            <div class="mt-4">
                <h3 class="text-3xl font-black text-gray-900 dark:text-white">{{ stats.lowStock }}</h3>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Stok Menipis (&lt;10)</p>
            </div>
        </div>

        <!-- Total Suppliers -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between">
                <div class="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-2xl text-purple-600 dark:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                </div>
                <span class="text-[10px] font-black text-purple-500 uppercase tracking-widest bg-purple-50 dark:bg-purple-500/20 px-2 py-1 rounded-lg">Mitra</span>
            </div>
            <div class="mt-4">
                <h3 class="text-3xl font-black text-gray-900 dark:text-white">{{ stats.totalSuppliers }}</h3>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Total Supplier</p>
            </div>
        </div>
    </div>
</template>

<script>
import { storageService } from "@/services/storage";

export default {
    name: 'StatsWidgets',
    data() {
        return {
            stats: {
                totalItems: 0,
                totalValue: 0,
                lowStock: 0,
                totalSuppliers: 0
            }
        };
    },
    created() {
        this.refreshStats();
    },
    methods: {
        refreshStats() {
            this.stats = storageService.getStats();
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID').format(value);
        }
    }
}
</script>
