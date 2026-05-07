<template>
    <div class="space-y-6 transition-colors duration-300">
        <!-- Action Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div class="flex items-center space-x-3">
                <div class="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">Data Supplier</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Total {{ totalItems }} supplier terdaftar</p>
                </div>
            </div>
            
            <div class="flex items-center space-x-3">
                <!-- Export Dropdown -->
                <div class="relative group/export">
                    <button class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm hover:border-secondary hover:text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Export Data</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    
                    <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 opacity-0 invisible group-hover/export:opacity-100 group-hover/export:visible transition-all duration-300 z-50">
                        <button @click="exportToPDF" class="w-full text-left px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/10 hover:text-red-600 flex items-center space-x-3 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span>Download PDF</span>
                        </button>
                        <button @click="exportToExcel" class="w-full text-left px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/10 hover:text-green-600 flex items-center space-x-3 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Download Excel</span>
                        </button>
                    </div>
                </div>

                <router-link to="/create-supplier">
                    <button class="bg-secondary hover:bg-primary-dark text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-secondary/20 flex items-center space-x-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Supplier</span>
                    </button>
                </router-link>
            </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50/50 dark:bg-gray-800/50">
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">No</th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Nama Supplier</th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Alamat</th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">No. Telp</th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                        <tr v-for="(item, index) in items" :key="item.id" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                            <td class="px-6 py-4 text-sm font-medium text-gray-400 dark:text-gray-500">{{ (currentPage - 1) * 10 + index + 1 }}</td>
                            <td class="px-6 py-4">
                                <span class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-secondary transition-colors">{{ item.namaSupplier }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-sm font-medium text-gray-600 dark:text-gray-400 truncate max-w-xs block">{{ item.alamat }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <span class="text-sm font-bold text-gray-700 dark:text-gray-300">{{ item.noTelp }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <router-link :to="{ name: 'UpdateListSupplier', params: { id: item.id } }">
                                        <button class="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-600 hover:text-white rounded-lg transition-all shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </router-link>
                                    <button 
                                        @click="onDelete(item.id, item.namaSupplier)"
                                        class="p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white rounded-lg transition-all shadow-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr v-if="items.length === 0">
                            <td colspan="5" class="px-6 py-12 text-center">
                                <div class="flex flex-col items-center space-y-2 opacity-40">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p class="text-sm font-bold text-gray-900 dark:text-white">Belum ada data supplier</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Custom Pagination -->
            <div class="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between transition-colors duration-300">
                <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Halaman {{ currentPage }} dari {{ totalPages }}
                </span>
                <div class="flex space-x-2">
                    <button 
                        @click="changePage(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-secondary disabled:opacity-30 transition-all shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        @click="changePage(currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-secondary disabled:opacity-30 transition-all shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import swal from "sweetalert";
import { storageService } from "@/services/storage";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default {
    data() {
        return {
            items: [],
            currentPage: 1,
            totalItems: 0,
            totalPages: 0,
            searchQuery: "",
        };
    },
    created() {
        this.getData(this.currentPage);
    },
    methods: {
        async getData(page) {
            const res = storageService.getSuppliers(page, 5, this.searchQuery);
            this.currentPage = res.page;
            this.totalItems = res.total_record;
            this.totalPages = res.total_page;
            this.items = res.data;
        },
        async onDelete(id, namaSupplier) {
            swal({
                title: "Apakah Anda yakin?",
                text: `Supplier "${namaSupplier}" akan dihapus permanen!`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    try {
                        storageService.deleteSupplier(id);
                        swal("Berhasil!", "Data supplier telah dihapus", "success");
                        this.getData(this.currentPage);
                    } catch (error) {
                        swal("Gagal!", "Gagal menghapus data supplier", "error");
                    }
                }
            });
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.getData(page);
            }
        },
        exportToPDF() {
            const doc = new jsPDF();
            const allSuppliers = storageService.getAllSuppliers();
            
            const tableColumn = ["No", "Nama Supplier", "Alamat", "Kontak"];
            const tableRows = [];

            allSuppliers.forEach((item, index) => {
                const rowData = [
                    index + 1,
                    item.namaSupplier,
                    item.alamat,
                    item.noTelp
                ];
                tableRows.push(rowData);
            });

            doc.text("Laporan Daftar Supplier", 14, 15);
            doc.autoTable({ head: [tableColumn], body: tableRows, startY: 20 });
            doc.save(`laporan_supplier_${new Date().getTime()}.pdf`);
            swal("Berhasil!", "File PDF telah diunduh", "success");
        },
        exportToExcel() {
            const allSuppliers = storageService.getAllSuppliers();
            const data = allSuppliers.map((item, index) => ({
                "No": index + 1,
                "Nama Supplier": item.namaSupplier,
                "Alamat": item.alamat,
                "Kontak": item.noTelp
            }));

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Daftar Supplier");
            
            XLSX.writeFile(wb, `laporan_supplier_${new Date().getTime()}.xlsx`);
            swal("Berhasil!", "File Excel telah diunduh", "success");
        }
    },
};
</script>