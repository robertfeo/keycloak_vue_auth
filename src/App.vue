<script setup>
import { RouterView } from 'vue-router';
import HeaderMenu from './components/HeaderMenu.vue';
</script>

<template>
  <!-- <meta http-equiv="Content-Security-Policy"
    content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://www.google.com"> -->
  <header>
    <div class="flex flex-col items-center">
      <HeaderMenu/>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>
  <RouterView />
</template>

<style>
</style>
