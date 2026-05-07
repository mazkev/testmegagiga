<template>
    <div class="container mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center space-x-3 group cursor-pointer" @click="$router.push('/dashboard')">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </div>
            <div>
                <h3 class="text-xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-none">Marketplace</h3>
                <span class="text-[10px] font-bold text-primary tracking-[0.3em] uppercase opacity-80">Inventaris System</span>
            </div>
        </div>

        <div class="flex items-center space-x-6">
            <div class="hidden md:flex items-center space-x-4">
                <div class="flex flex-col items-end">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Server Status</span>
                    <span class="flex items-center text-[10px] font-black text-green-500 uppercase">
                        <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                        Online
                    </span>
                </div>
            </div>
            
            <div class="flex items-center space-x-2 border-l border-gray-100 pl-6 dark:border-gray-800">
                <!-- Dark Mode Toggle -->
                <button 
                    @click="toggleDarkMode"
                    class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border border-gray-100 dark:border-gray-700"
                    :class="isDark ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-400 hover:text-primary'"
                >
                    <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>

                <button @click="logout" class="px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold text-xs transition-all duration-300 flex items-center space-x-2 shadow-sm border border-red-100 dark:border-transparent">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span class="hidden sm:inline">Logout</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderComp',
    data() {
        return {
            isDark: false
        };
    },
    mounted() {
        this.isDark = localStorage.getItem('app_theme') === 'dark';
        this.applyTheme();
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/");
        },
        toggleDarkMode() {
            this.isDark = !this.isDark;
            localStorage.setItem('app_theme', this.isDark ? 'dark' : 'light');
            this.applyTheme();
        },
        applyTheme() {
            if (this.isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }
    }
}
</script>
