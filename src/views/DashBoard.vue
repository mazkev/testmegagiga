<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col font-sans transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
      <HeaderComp />
    </header>

    <div class="flex-grow container mx-auto px-4 py-8">
      <!-- Top Analytics Widgets -->
      <StatsWidgets ref="stats" />

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <aside class="lg:w-1/4">
          <SideBarComp 
            :active-tab="activeTab" 
            @tab-change="activeTab = $event" 
          />
        </aside>

        <!-- Main Content -->
        <main class="lg:w-3/4 space-y-6">
          <!-- Feature 1: Stock Charts -->
          <StockCharts v-if="activeTab === 'barang'" key="charts" />

          <!-- Content Card -->
          <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden transition-all duration-500">
            <!-- Content Header -->
            <div class="px-8 py-6 border-b border-gray-50 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/30 flex items-center justify-between">
              <div>
                <h1 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                  {{ getTitle() }}
                </h1>
                <p class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {{ getSubtitle() }}
                </p>
              </div>
              <div class="hidden sm:block">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                  {{ activeTab }} View
                </span>
              </div>
            </div>

            <!-- Content Body -->
            <div class="p-0">
              <transition name="fade" mode="out-in">
                <div v-if="activeTab === 'barang'" key="barang" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ListBarang @data-changed="refreshDashboard" />
                </div>
                <div v-else-if="activeTab === 'supplier'" key="supplier" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ListSupplier @data-changed="refreshDashboard" />
                </div>
                <div v-else-if="activeTab === 'history'" key="history" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <TransactionLog />
                </div>
              </transition>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-auto bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <FooterComp />
    </footer>
  </div>
</template>

<script>
import ListBarang from "@/components/ListBarang.vue";
import ListSupplier from "@/components/ListSupplier.vue";
import FooterComp from "@/components/FooterComp.vue";
import HeaderComp from "@/components/HeaderComp.vue";
import SideBarComp from "@/components/SideBarComp.vue";
import StatsWidgets from "@/components/StatsWidgets.vue";
import TransactionLog from "@/components/TransactionLog.vue";
import StockCharts from "@/components/StockCharts.vue";

export default {
  name: "DashBoard",
  components: {
    ListBarang,
    ListSupplier,
    FooterComp,
    HeaderComp,
    SideBarComp,
    StatsWidgets,
    TransactionLog,
    StockCharts
  },
  data() {
    return {
      activeTab: 'barang'
    };
  },
  methods: {
    getTitle() {
      if (this.activeTab === 'barang') return 'Manajemen Barang';
      if (this.activeTab === 'supplier') return 'Manajemen Supplier';
      if (this.activeTab === 'history') return 'Audit Log Sistem';
      return '';
    },
    getSubtitle() {
      if (this.activeTab === 'barang') return 'Kelola stok dan inventaris barang Anda';
      if (this.activeTab === 'supplier') return 'Kelola data supplier dan mitra bisnis';
      if (this.activeTab === 'history') return 'Pantau aktivitas dan perubahan data';
      return '';
    },
    refreshDashboard() {
        if (this.$refs.stats) {
            this.$refs.stats.refreshStats();
        }
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
