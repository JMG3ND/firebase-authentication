<template>
    <div v-if="!userData.loading" class="register">
        <header class="register__header">
            <h2 class="register__title">Registrarse</h2>
        </header>
        <article class="register__article">
            <form class="register__form" @submit.prevent="comprobarDatos">
                <div class="register__input-group">
                    <input class="register__input" type="email" placeholder="Correo" v-model.trim="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                    <input class="register__input" type="password" placeholder="Contraseña" v-model.trim="password"
                        required>
                    <input class="register__input" type="password" placeholder="Confirmar contraseña"
                        v-model.trim="password_confirm" required>
                    <!--pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" con este patrón se valida el formato de contraseña-->
                </div>
                <div class="register__button-group">
                    <button class="register__button" type="submit">Registrarse</button>
                </div>
            </form>
        </article>
    </div>
    <LoadingSpinner v-else />
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/userData';
import LoadingSpinner from './LoadingSpinner.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userData = useUserStore();

const email = ref('');
const password = ref('');
const password_confirm = ref('');

const comprobarDatos = async () => {
    if (password.value === password_confirm.value) {
        if (email.value != '') {
            await userData.registerUser(email.value, password.value);
            router.push('/');
        }
        else {
            alert('correo inválido');
        }
    } else {
        alert('las contraseñas no coinciden');
    }
}
</script>

<style lang="scss">
@import '../assets/theme-colors.scss';

.register {
    padding: 1rem;
    background: transparent;

    &__header {
        margin-bottom: 2rem;
    }

    &__title {
        text-align: center;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__input-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__input {
        border-radius: 5px;
        padding: 0.5rem;
        background-color: $colorC;
        border: none;
    }

    &__password-label {
        font-size: xx-small;
        max-width: 200px;
    }

    &__button {
        margin-top: 1rem;
        width: 100%;
        border-radius: 5px;
        padding: 0.5rem;
        background-color: $colorA;
        border: none;
        cursor: pointer;
    }
}
</style>