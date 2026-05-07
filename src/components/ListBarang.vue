<template>
    <div class="space-y-6">
        <!-- Action Header -->
        <div class="flex flex-col xl:flex-row items-center justify-between gap-6 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <!-- Search Side -->
            <div class="flex items-center space-x-4 w-full xl:w-1/3">
                <div class="p-3 bg-primary/10 dark:bg-primary/20 rounded-2xl text-primary shrink-0 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div class="flex-grow">
                    <input 
                        v-model="searchQuery" 
                        @input="onSearch"
                        type="text" 
                        placeholder="Cari barang atau supplier..."
                        class="w-full px-5 py-3 rounded-2xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-700 outline-none transition-all text-sm font-bold placeholder:text-gray-400 dark:placeholder:text-gray-500 placeholder:font-medium dark:text-white"
                    >
                </div>
            </div>
            
            <!-- Actions Side -->
            <div class="flex flex-wrap items-center justify-center xl:justify-end gap-3 w-full xl:w-2/3">
                <input type="file" ref="csvInput" class="hidden" accept=".csv" @change="handleImport">
                
                <button @click="triggerImport" class="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white font-black text-xs uppercase tracking-widest transition-all duration-300 border border-blue-100/50 dark:border-blue-500/20 shadow-sm active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span>Import</span>
                </button>

                <button @click="exportToCSV" class="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white font-black text-xs uppercase tracking-widest transition-all duration-300 border border-green-100/50 dark:border-green-500/20 shadow-sm active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Export</span>
                </button>

                <button @click="seedFromAPI" class="flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 dark:hover:text-white font-black text-xs uppercase tracking-widest transition-all duration-300 border border-purple-100/50 dark:border-purple-500/20 shadow-sm active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Seed</span>
                </button>

            <div class="flex items-center space-x-3">
                <!-- Export Dropdown -->
                <div class="relative group/export">
                    <button class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center space-x-2 text-sm hover:border-primary hover:text-primary">
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

                <router-link to="/create-barang">
                    <button class="bg-primary hover:bg-primary-dark text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 flex items-center space-x-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Tambah Barang</span>
                    </button>
                </router-link>
            </div>
            </div>
        </div>

        <!-- Table Card -->
        <div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50/50 dark:bg-gray-800/50">
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">No</th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
                                <button @click="toggleSort('namaBarang')" class="flex items-center space-x-1 hover:text-primary transition-colors">
                                    <span>Barang</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-center">
                                <button @click="toggleSort('stok')" class="flex items-center space-x-1 hover:text-primary transition-colors mx-auto">
                                    <span>Stok</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">
                                <button @click="toggleSort('harga')" class="flex items-center space-x-1 hover:text-primary transition-colors">
                                    <span>Harga</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </button>
                            </th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800">Supplier</th>
                            <th class="px-6 py-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-gray-800 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50 dark:divide-gray-800">
                        <tr v-for="(item, index) in items" :key="item.id || index" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                            <td class="px-6 py-4 text-sm font-medium text-gray-400 dark:text-gray-500">{{ (currentPage - 1) * 10 + index + 1 }}</td>
                            <td class="px-6 py-4" v-if="item">
                                <div class="flex items-center space-x-3">
                                    <div class="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-50 dark:border-gray-700">
                                        <img :src="item.imageUrl || 'https://via.placeholder.com/150'" alt="" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                                    </div>
                                    <span class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{{ item.namaBarang || 'Tanpa Nama' }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-center">
                                <span :class="[
                                    'px-2.5 py-1 rounded-lg text-xs font-black tracking-wider uppercase',
                                    item.stok > 10 ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 animate-pulse'
                                ]">
                                    {{ item.stok }}
                                </span>
                            </td>
                            <td class="px-6 py-4">
                                <span class="text-sm font-bold text-gray-700 dark:text-gray-300">Rp {{ formatCurrency(item.harga) }}</span>
                            </td>
                            <td class="px-6 py-4">
                                <div class="flex flex-col">
                                    <span class="text-sm font-bold text-gray-900 dark:text-white">{{ item.supplier?.namaSupplier || '-' }}</span>
                                    <span class="text-[10px] font-medium text-gray-400 dark:text-gray-500">{{ item.supplier?.noTelp || '-' }}</span>
                                </div>
                            </td>
                            <td class="px-6 py-4 text-right">
                                <div class="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <router-link :to="{ name: 'UpdateListBarang', params: { id: item.id } }">
                                        <button class="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-600 hover:text-white rounded-lg transition-all shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                    </router-link>
                                    <button 
                                        @click="onDelete(item.id, item.namaBarang)"
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
                            <td colspan="6" class="px-6 py-12 text-center">
                                <div class="flex flex-col items-center space-y-2 opacity-40">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <p class="text-sm font-bold text-gray-900 dark:text-white">Tidak ada data ditemukan</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Custom Pagination -->
            <div class="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                    Halaman {{ currentPage }} dari {{ totalPages }}
                </span>
                <div class="flex space-x-2">
                    <button 
                        @click="changePage(currentPage - 1)"
                        :disabled="currentPage === 1"
                        class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-primary disabled:opacity-30 transition-all shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        @click="changePage(currentPage + 1)"
                        :disabled="currentPage === totalPages"
                        class="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-primary disabled:opacity-30 transition-all shadow-sm"
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
            sortBy: "namaBarang",
        };
    },
    created() {
        this.getData(this.currentPage);
    },
    methods: {
        async getData(page) {
            try {
                const res = storageService.getBarang(page, 10, this.searchQuery, this.sortBy);
                if (res) {
                    this.currentPage = res.page || 1;
                    this.totalItems = res.total_record || 0;
                    this.totalPages = res.total_page || 1;
                    // Filter out any null/corrupt entries
                    this.items = (res.data || []).filter(i => i && i.id);
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
                this.items = [];
            }
        },
        async onDelete(id, namaBarang) {
            swal({
                title: "Apakah Anda yakin?",
                text: `Barang "${namaBarang}" akan dihapus permanen!`,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    try {
                        storageService.deleteBarang(id);
                        swal("Berhasil!", "Data barang telah dihapus", "success");
                        this.getData(this.currentPage);
                        this.$emit('data-changed');
                    } catch (error) {
                        swal("Gagal!", "Gagal menghapus data barang", "error");
                    }
                }
            });
        },
        onSearch() {
            this.currentPage = 1;
            this.getData(1);
        },
        toggleSort(field) {
            this.sortBy = field;
            this.getData(this.currentPage);
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.getData(page);
            }
        },
        exportToPDF() {
            const doc = new jsPDF();
            const allBarang = storageService.getAllBarang();
            
            const tableColumn = ["No", "Nama Barang", "Harga", "Stok", "Supplier"];
            const tableRows = [];

            allBarang.forEach((item, index) => {
                const rowData = [
                    index + 1,
                    item.namaBarang,
                    `Rp ${item.harga.toLocaleString()}`,
                    item.stok,
                    item.supplier?.namaSupplier || '-'
                ];
                tableRows.push(rowData);
            });

            doc.text("Laporan Inventaris Barang", 14, 15);
            doc.autoTable(tableColumn, tableRows, { startY: 20 });
            doc.save(`laporan_barang_${new Date().getTime()}.pdf`);
            swal("Berhasil!", "File PDF telah diunduh", "success");
        },
        exportToExcel() {
            const allBarang = storageService.getAllBarang();
            const data = allBarang.map((item, index) => ({
                "No": index + 1,
                "Nama Barang": item.namaBarang,
                "Harga": item.harga,
                "Stok": item.stok,
                "Supplier": item.supplier?.namaSupplier || '-'
            }));

            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Inventaris Barang");
            XLSX.utils.sheet_add_aoa(ws, [["Laporan Inventaris Barang"]], { origin: "A1" });
            
            XLSX.writeFile(wb, `laporan_barang_${new Date().getTime()}.xlsx`);
            swal("Berhasil!", "File Excel telah diunduh", "success");
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID').format(value);
        },
        exportToCSV() {
            try {
                // Get all data regardless of search
                const exportData = storageService.getBarang(1, 99999, "", this.sortBy).data;
                
                const headers = ["ID", "Nama Barang", "Harga", "Stok", "Nama Supplier", "No Telp Supplier"];
                
                const escapeCSV = (val) => {
                    const stringVal = String(val === null || val === undefined ? "" : val);
                    if (stringVal.includes(',') || stringVal.includes('"') || stringVal.includes('\n')) {
                        return `"${stringVal.replace(/"/g, '""')}"`;
                    }
                    return stringVal;
                };

                const rows = exportData.map(item => [
                    item.id,
                    escapeCSV(item.namaBarang),
                    item.harga,
                    item.stok,
                    escapeCSV(item.supplier?.namaSupplier || '-'),
                    escapeCSV(item.supplier?.noTelp || '-')
                ]);
                
                const csvString = [
                    headers.join(','),
                    ...rows.map(row => row.join(','))
                ].join('\n');
                
                // Add UTF-8 BOM for Excel compatibility
                const BOM = '\uFEFF';
                const blob = new Blob([BOM + csvString], { type: 'text/csv;charset=utf-8;' });
                
                const url = URL.createObjectURL(blob);
                const link = document.body.appendChild(document.createElement("a"));
                link.href = url;
                link.download = `full_inventory_export_${Date.now()}.csv`;
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                swal("Berhasil!", "Seluruh data inventaris telah diexport ke CSV", "success");
            } catch (error) {
                swal("Gagal!", "Gagal mengeksport data", "error");
            }
        },
        triggerImport() {
            this.$refs.csvInput.click();
        },
        async handleImport(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const text = e.target.result;
                    const lines = text.split('\n');
                    
                    let updatedCount = 0;
                    let addedCount = 0;

                    for (let i = 1; i < lines.length; i++) {
                        if (!lines[i].trim()) continue;
                        const values = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); // CSV aware split
                        
                        const item = {
                            id: values[0].replace(/"/g, ''),
                            namaBarang: values[1].replace(/"/g, ''),
                            harga: values[2],
                            stok: values[3],
                            // Note: Supplier mapping would be complex via CSV, 
                            // usually keeps existing or sets to null
                        };

                        if (item.id && storageService.findBarangById(item.id)) {
                            storageService.updateBarang(item.id, item);
                            updatedCount++;
                        } else {
                            storageService.createBarang(item);
                            addedCount++;
                        }
                    }
                    
                    swal("Selesai!", `Import berhasil: ${updatedCount} diupdate, ${addedCount} ditambahkan.`, "success");
                    this.getData(1);
                    this.$emit('data-changed');
                } catch (error) {
                    swal("Gagal!", "Format CSV tidak valid", "error");
                }
            };
            reader.readAsText(file);
            event.target.value = ''; // Reset input
        },
        async seedFromAPI() {
            try {
                swal({
                    title: "Sedang mengambil data...",
                    text: "Mencoba beberapa sumber API",
                    icon: "info",
                    buttons: false,
                    closeOnClickOutside: false,
                });

                let products = [];
                try {
                    // Try DummyJSON first
                    const response = await fetch('https://dummyjson.com/products?limit=10');
                    if (!response.ok) throw new Error('DummyJSON failed');
                    const data = await response.json();
                    products = data.products.map(p => ({
                        namaBarang: p.title,
                        harga: Math.round(p.price * 15000),
                        stok: p.stock,
                        imageUrl: p.thumbnail,
                        supplier: { namaSupplier: p.brand || 'Global Vendor', noTelp: '08123456789' }
                    }));
                } catch (e) {
                    // Fallback to FakeStoreAPI
                    const response = await fetch('https://fakestoreapi.com/products?limit=10');
                    const data = await response.json();
                    products = data.map(p => ({
                        namaBarang: p.title,
                        harga: Math.round(p.price * 15000),
                        stok: Math.floor(Math.random() * 50) + 10,
                        imageUrl: p.image,
                        supplier: { namaSupplier: 'FakeStore Vendor', noTelp: '08123456789' }
                    }));
                }

                if (products.length === 0) throw new Error('No products found');

                products.forEach(p => storageService.createBarang(p));
                
                swal("Berhasil!", `${products.length} data barang berhasil diimport dari API`, "success");
                this.getData(1);
                this.$emit('data-changed');
            } catch (error) {
                console.error("Seeding failed:", error);
                swal("Gagal!", "Gagal mengambil data dari API. Silakan coba lagi atau cek koneksi internet Anda.", "error");
            }
        }
    },
};
</script>