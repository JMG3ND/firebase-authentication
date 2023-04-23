<template>
    <div class="content">
        <div class="content__login-container" :class="activeLogin">
            <LoginComp />
        </div>
        <div class="content__register-container" :class="activeRegister">
            <RegisterComp />
        </div>
        <div class="content__panel-button" :class="activeAction">
            <button @click="activation" class="content__button">
                {{ buttonText }}
            </button>
            <RouterLink to="/" class="content__button">Regresar</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref, computed } from 'vue';
import LoginComp from '../components/LoginComp.vue';
import RegisterComp from '../components/RegisterComp.vue';

const active = ref(false);
const activation = () => active.value = !active.value;
const activeAction = computed(() => active.value ? 'content__panel-button--active' : '');
const activeLogin = computed(() => !active.value ? 'content__login-container--active' : '')
const activeRegister = computed(() => active.value ? 'content__register-container--active' : '')
const buttonText = computed(() => active.value ? 'Iniciar Sesión' : 'Registrarse');
</script>

<style lang="scss">
@import '../assets/theme-colors.scss';

@media screen and (min-width: 851px) {
    .content {
        position: relative;
        display: grid;
        grid-template-columns: 1fr 1fr;
        background: $colorD;
        width: 100%;
        height: 100%;
        max-width: 1000px;
        max-height: 600px;
        border-radius: 20px;

        &__login-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__register-container {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &__panel-button {
            border-radius: 0 20px 20px 0;
            background: $colorE;
            position: absolute;
            content: '';
            width: 50%;
            height: 100%;
            transition: transform 0.5s;
            transform: translateX(100%);

            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
            justify-content: center;

            &--active {
                border-radius: 20px 0 0 20px;
                transform: unset;
            }
        }

        &__button {
            text-decoration: none;
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            background-color: $colorC;
            border: none;
        }
    }
}

@media screen and (max-width: 850px) {
    .content {
        background: $colorD;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
        max-width: 1000px;
        max-height: 600px;
        border-radius: 20px;

        &__login-container {
            display: none;
            align-items: center;
            justify-content: center;

            &--active {
                display: flex;
            }
        }

        &__register-container {
            display: none;
            align-items: center;
            justify-content: center;

            &--active {
                display: flex;
            }
        }

        &__panel-button {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 1rem;
        }

        &__button {
            text-decoration: none;
            cursor: pointer;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            background-color: $colorC;
            border: none;
        }
    }
}
</style>
