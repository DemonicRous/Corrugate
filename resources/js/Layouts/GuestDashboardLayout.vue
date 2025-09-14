<!-- resources/js/Layouts/GuestDashboardLayout.vue -->
<script setup>
import { ref } from 'vue';
import CorrugateLogo from '@/Components/CorrugateLogo.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import ThemeToggle from "@/Components/ThemeToggle.vue";
// Импортируем компонент темы, если он у вас есть
// import ThemeToggle from '@/Components/ThemeToggle.vue';

const showingNavigationDropdown = ref(false);

defineProps({
    // Опционально: передавать активную страницу
    activePage: {
        type: String,
        default: 'home'
    }
});
</script>

<template>
    <div>
        <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav class="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
                <!-- Primary Navigation Menu -->
                <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div class="flex h-16 justify-between">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex shrink-0 items-center">
                                <Link href="/">
                                    <CorrugateLogo class="block h-9 w-auto text-gray-800 dark:text-gray-200" />
                                </Link>
                            </div>

                            <!-- Navigation Links (для гостей) -->
                            <div class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink :href="route('welcome')" :active="activePage === 'home'">
                                    Главная
                                </NavLink>
                            </div>
                        </div>


                        <div class="hidden sm:ms-6 sm:flex sm:items-center">
                            <!-- Theme Toggle (если реализован) -->
                            <div class="relative ms-3">
                                <ThemeToggle />
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-me-2 flex items-center sm:hidden">
                            <button
                                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                                @click="showingNavigationDropdown = !showingNavigationDropdown"
                            >
                                <svg
                                    class="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex': !showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex': showingNavigationDropdown,
                                        }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div
                    :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                    class="sm:hidden"
                >
                    <div class="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink :href="route('welcome')" :active="activePage === 'home'">
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink v-if="canLogin" :href="route('login')" :active="activePage === 'login'">
                            Login
                        </ResponsiveNavLink>
                        <ResponsiveNavLink v-if="canRegister" :href="route('register')" :active="activePage === 'register'">
                            Register
                        </ResponsiveNavLink>
                    </div>
                </div>
            </nav>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
