<template>
  <div id="app" class="antialiased text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-950 min-h-screen font-sans transition-colors duration-300">
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

/* Ensure the background color fills the entire screen even if content is short */
html, body {
  @apply bg-gray-50 dark:bg-gray-950 transition-colors duration-300;
}
</style>
