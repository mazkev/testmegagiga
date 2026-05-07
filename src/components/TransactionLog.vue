<template>
    <div class="space-y-6">
        <div class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            <div class="px-8 py-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between bg-gray-50/30 dark:bg-gray-800/30">
                <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">Riwayat Aktivitas</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Melacak 100 aktivitas terakhir dalam sistem</p>
                </div>
                <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-400 dark:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>

            <div class="p-0">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50/50 dark:bg-gray-800/50">
                                <th class="px-8 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Waktu</th>
                                <th class="px-8 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-center">Aksi</th>
                                <th class="px-8 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">User</th>
                                <th class="px-8 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Detail</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                            <tr v-for="log in logs" :key="log.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors">
                                <td class="px-8 py-4">
                                    <div class="flex flex-col">
                                        <span class="text-sm font-bold text-gray-900 dark:text-white">{{ formatDate(log.timestamp) }}</span>
                                        <span class="text-[10px] font-medium text-gray-400 dark:text-gray-500">{{ formatTime(log.timestamp) }}</span>
                                    </div>
                                </td>
                                <td class="px-8 py-4 text-center">
                                    <span :class="[
                                        'px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase',
                                        getActionClass(log.action)
                                    ]">
                                        {{ log.action }}
                                    </span>
                                </td>
                                <td class="px-8 py-4">
                                    <span class="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-tighter">{{ log.user }}</span>
                                </td>
                                <td class="px-8 py-4">
                                    <p class="text-sm font-medium text-gray-600 dark:text-gray-400 italic">"{{ log.details }}"</p>
                                </td>
                            </tr>
                            <tr v-if="logs.length === 0">
                                <td colspan="4" class="px-8 py-12 text-center text-gray-400 dark:text-gray-500 font-bold opacity-40">
                                    Belum ada riwayat aktivitas yang tercatat.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { storageService } from "@/services/storage";

export default {
    name: 'TransactionLog',
    data() {
        return {
            logs: []
        };
    },
    created() {
        this.logs = storageService.getLogs();
    },
    methods: {
        formatDate(isoString) {
            return new Date(isoString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        },
        formatTime(isoString) {
            return new Date(isoString).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        },
        getActionClass(action) {
            if (action.includes('CREATE')) return 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400';
            if (action.includes('UPDATE')) return 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400';
            if (action.includes('DELETE')) return 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400';
            if (action.includes('LOGIN')) return 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400';
            return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400';
        }
    }
}
</script>
