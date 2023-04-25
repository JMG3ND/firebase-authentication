<template>
    <div v-if="!user.userData">
        <RouterLink class="button" to="/login">Iniciar Sesión</RouterLink>
    </div>
    <div v-else class="panel">
        <h1>Bienvenido {{ user.userData.email }}</h1>
        <button @click="user.singOutUser" class="button">Cerrar Sesión</button>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/userData';

const user = useUserStore();
</script>

<style lang="scss">
@import '../assets/theme-colors.scss';

.button {
    text-align: center;
    display: block;
    cursor: pointer;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    background-color: $colorA;
    border: none;
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h1 {
        text-align: center;
    }
}
</style>