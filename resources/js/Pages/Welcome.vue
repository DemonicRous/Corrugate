<!-- resources/js/Pages/Welcome.vue -->
<script setup>
import { Head } from '@inertiajs/vue3';
import GuestDashboardLayout from '@/Layouts/GuestDashboardLayout.vue';
// import CorrugateLogo from '@/Components/CorrugateLogo.vue'; // Уже в макете

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    // laravelVersion: {
    //     type: String,
    //     required: true,
    // },
    // phpVersion: {
    //     type: String,
    //     required: true,
    // },
});
</script>

<template>
    <Head title="Welcome" />

    <GuestDashboardLayout active-page="home">
        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div class="p-6 text-gray-900 dark:text-gray-100">
                        <div class="text-center mb-8">
                            <h1 class="text-3xl font-bold mb-2">Добро пожаловать в Corrugate</h1>
                            <p class="text-lg text-gray-600 dark:text-gray-400">
                                Ваше решение для управления ...
                            </p>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow">
                                <h2 class="text-xl font-semibold mb-4">О проекте</h2>
                                <p class="mb-4">
                                    Corrugate - это мощная платформа, разработанная для ...
                                </p>
                                <ul class="list-disc pl-5 space-y-2">
                                    <li>Функция 1</li>
                                    <li>Функция 2</li>
                                    <li>Функция 3</li>
                                </ul>
                            </div>

                            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 shadow">
                                <h2 class="text-xl font-semibold mb-4">Начало работы</h2>
                                <p class="mb-4">
                                    Чтобы начать использовать Corrugate, пожалуйста:
                                </p>
                                <div class="flex flex-col space-y-4">
                                    <div v-if="canRegister">
                                        <a
                                            :href="route('register')"
                                            class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                        >
                                            Создать аккаунт
                                        </a>
                                    </div>
                                    <div v-if="canLogin">
                                        <a
                                            :href="route('login')"
                                            class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                                        >
                                            Войти
                                        </a>
                                    </div>
                                    <p v-if="!canLogin && !canRegister" class="text-sm text-gray-500 dark:text-gray-400">
                                        Пожалуйста, свяжитесь с администратором для получения доступа.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                            <p>© {{ new Date().getFullYear() }} Corrugate. Все права защищены.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </GuestDashboardLayout>
</template>
