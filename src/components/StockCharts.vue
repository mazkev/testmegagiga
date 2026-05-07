<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- Stock Distribution Chart -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">Distribusi Stok</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Berdasarkan supplier terdaftar</p>
                </div>
                <div class="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-blue-600 dark:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                </div>
            </div>
            <div class="h-[300px]">
                <apexchart 
                    type="donut" 
                    height="100%" 
                    :options="donutOptions" 
                    :series="donutSeries"
                    v-if="donutSeries.length > 0"
                ></apexchart>
                <div v-else class="h-full flex items-center justify-center text-gray-400 dark:text-gray-600 font-bold italic opacity-40">
                    Belum ada data stok
                </div>
            </div>
        </div>

        <!-- Top Stock Items Chart -->
        <div class="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm transition-colors duration-300">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white">Top 5 Stok Terbanyak</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Barang dengan ketersediaan tertinggi</p>
                </div>
                <div class="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
            </div>
            <div class="h-[300px]">
                <apexchart 
                    type="bar" 
                    height="100%" 
                    :options="barOptions" 
                    :series="barSeries"
                    v-if="barSeries[0].data.length > 0"
                ></apexchart>
                <div v-else class="h-full flex items-center justify-center text-gray-400 dark:text-gray-600 font-bold italic opacity-40">
                    Belum ada data barang
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import { storageService } from '@/services/storage'

export default {
    name: 'StockCharts',
    components: {
        apexchart: VueApexCharts
    },
    data() {
        return {
            donutSeries: [],
            donutOptions: {
                chart: {
                    fontFamily: 'Outfit, Inter, sans-serif',
                },
                labels: [],
                colors: ['#f97316', '#3b82f6', '#8b5cf6', '#10b981', '#ec4899', '#f59e0b'],
                legend: {
                    position: 'bottom',
                    labels: {
                        colors: '#6b7280'
                    }
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '75%',
                            labels: {
                                show: true,
                                name: {
                                    show: true,
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    color: '#6b7280'
                                },
                                value: {
                                    show: true,
                                    fontSize: '24px',
                                    fontWeight: 900,
                                    color: '#1f2937'
                                },
                                total: {
                                    show: true,
                                    label: 'Total Stok',
                                    formatter: function (w) {
                                        return w.globals.seriesTotals.reduce((a, b) => a + b, 0)
                                    }
                                }
                            }
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    theme: 'light'
                }
            },
            barSeries: [{
                name: 'Stok',
                data: []
            }],
            barOptions: {
                chart: {
                    toolbar: { show: false },
                    fontFamily: 'Outfit, Inter, sans-serif'
                },
                plotOptions: {
                    bar: {
                        borderRadius: 8,
                        horizontal: true,
                        distributed: true,
                        barHeight: '60%'
                    }
                },
                colors: ['#f97316', '#3b82f6', '#8b5cf6', '#10b981', '#ec4899'],
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['#fff'],
                        fontWeight: 900
                    },
                    formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ": " + val
                    },
                    offsetX: 0
                },
                legend: { show: false },
                grid: {
                    show: false
                },
                xaxis: {
                    categories: [],
                    labels: { show: false },
                    axisBorder: { show: false },
                    axisTicks: { show: false }
                },
                yaxis: {
                    labels: { show: false }
                },
                tooltip: {
                    theme: 'light'
                }
            }
        }
    },
    mounted() {
        this.loadChartData();
        this.updateChartTheme();
        
        // Listen for theme changes
        const observer = new MutationObserver(() => {
            this.updateChartTheme();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        this.$once('hook:beforeDestroy', () => observer.disconnect());
    },
    methods: {
        loadChartData() {
            const allBarang = storageService.getAllBarang();
            
            // Donut: Stok per Supplier
            const supplierData = {};
            allBarang.forEach(item => {
                const supplierName = item.supplier?.namaSupplier || 'Tanpa Supplier';
                supplierData[supplierName] = (supplierData[supplierName] || 0) + item.stok;
            });

            this.donutSeries = Object.values(supplierData);
            this.donutOptions.labels = Object.keys(supplierData);

            // Bar: Top 5 Items
            const topItems = [...allBarang]
                .sort((a, b) => b.stok - a.stok)
                .slice(0, 5);

            this.barSeries[0].data = topItems.map(item => item.stok);
            this.barOptions.xaxis.categories = topItems.map(item => item.namaBarang);
        },
        updateChartTheme() {
            const isDark = document.documentElement.classList.contains('dark');
            
            this.donutOptions = {
                ...this.donutOptions,
                theme: { mode: isDark ? 'dark' : 'light' },
                plotOptions: {
                    ...this.donutOptions.plotOptions,
                    pie: {
                        ...this.donutOptions.plotOptions.pie,
                        donut: {
                            ...this.donutOptions.plotOptions.pie.donut,
                            labels: {
                                ...this.donutOptions.plotOptions.pie.donut.labels,
                                value: {
                                    ...this.donutOptions.plotOptions.pie.donut.labels.value,
                                    color: isDark ? '#fff' : '#1f2937'
                                }
                            }
                        }
                    }
                }
            };
            
            this.barOptions = {
                ...this.barOptions,
                theme: { mode: isDark ? 'dark' : 'light' }
            };
        }
    }
}
</script>
