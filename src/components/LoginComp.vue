<template>
    <div v-if="!userData.loadingUser" class="login">
        <header class="login__header">
            <h2 class="login__title">Iniciar Sesión</h2>
        </header>
        <article class="login__article">
            <form class="login__form" @submit.prevent="iniciarSesion">
                <div class="login__input-group">
                    <input class="login__input" type="email" placeholder="Correo" v-model.trim="email"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                    <input class="login__input" type="password" placeholder="Contraseña" v-model.trim="password" required>
                </div>
                <div class="login__checkbox-group">
                    <input class="login__checkbox" type="checkbox" v-model="remember">
                    <label class="login__checkbox-label"> Mantener sesión</label>
                </div>
                <div class="login__button-group">
                    <button class="login__button" type="submit">Iniciar Sesión</button>
                </div>
            </form>
        </article>
    </div>
    <div v-else>
        <LoadingSpinner />
    </div>
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
const remember = ref(false);

const iniciarSesion = async () => {
    if (email.value != '') {
        await userData.singInUser(email.value, password.value);
        router.push('/');
    }
    else {
        alert('correo inválido');
    }
}
</script>

<style lang="scss">
@import '../assets/theme-colors.scss';

.login {
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

    &__checkbox-group {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    &__checkbox-label {
        font-size: small;
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