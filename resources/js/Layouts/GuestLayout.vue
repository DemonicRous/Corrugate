<!-- resources/js/Layouts/GuestLayout.vue (фрагмент) -->
<script setup>
import CorrugateLogo from '@/Components/CorrugateLogo.vue';
import { Link } from '@inertiajs/vue3';
import ThemeToggle from '@/Components/ThemeToggle.vue'; // Импортируем
</script>

<template>
    <div class="flex min-h-screen flex-col items-center bg-gray-100 pt-6 dark:bg-gray-900 sm:justify-center sm:pt-0">
        <div>
            <Link href="/">
                <CorrugateLogo class="h-20 w-20 fill-current text-gray-500" />
            </Link>
        </div>

        <div
            class="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:bg-gray-800"
        >
            <slot />
        </div>

        <!-- Добавляем переключатель темы в нижнюю часть гостевого макета -->
        <div class="mt-4">
            <ThemeToggle />
        </div>
    </div>
</template>
