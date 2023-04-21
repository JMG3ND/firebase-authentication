<template>
  <div class="center-content">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style lang="scss">
@import './assets/theme-colors.scss';

.center-content {
  //Le ponemos el tamaño de la pantalla y un color de fondo
  width: 100vw;
  height: 100vh;
  background: $colorC;

  //Lo hacemos de tipo flexible para centrar el container
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>