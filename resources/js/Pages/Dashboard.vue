<!-- resources/js/Pages/Dashboard.vue -->
<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import TabGroup from '@/Components/TabGroup.vue';
import TabList from '@/Components/TabList.vue';
import Tab from '@/Components/Tab.vue';
import TabPanels from '@/Components/TabPanels.vue';
import TabPanel from '@/Components/TabPanel.vue';
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <TabGroup storage-key="dashboard-active-tab" :default-tab="0" :enable-hotkeys="true">
                <template #default="{ setActiveTab, activeTab, tabs }">
                    <!-- Передаем список вкладок и обработчик навигации в TabList -->
                    <TabList
                        :tabs="tabs"
                        :active-tab="activeTab"
                        @navigate="setActiveTab"
                    />

                    <TabPanels>
                        <TabPanel :index="0">
                            <div class="py-12">
                                <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                        <div class="p-6 text-gray-900 dark:text-gray-100">
                                            <h3 class="text-lg font-medium mb-4">Содержимое Dashboard 1</h3>
                                            <p>Вы находитесь на первой странице Dashboard.</p>
                                            <p class="mt-2">Активная вкладка: {{ activeTab }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel :index="1">
                            <div class="py-12">
                                <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                        <div class="p-6 text-gray-900 dark:text-gray-100">
                                            <h3 class="text-lg font-medium mb-4">Содержимое Dashboard 2</h3>
                                            <p>Это вторая страница Dashboard.</p>
                                            <p class="mt-2">Активная вкладка: {{ activeTab }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel :index="2">
                            <div class="py-12">
                                <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                        <div class="p-6 text-gray-900 dark:text-gray-100">
                                            <h3 class="text-lg font-medium mb-4">Analytics</h3>
                                            <p>Здесь будут отображаться аналитические данные.</p>
                                            <p class="mt-2">Активная вкладка: {{ activeTab }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel :index="3">
                            <div class="py-12">
                                <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                        <div class="p-6 text-gray-900 dark:text-gray-100">
                                            <h3 class="text-lg font-medium mb-4">Reports</h3>
                                            <p>Здесь будут отображаться отчеты.</p>
                                            <p class="mt-2">Активная вкладка: {{ activeTab }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>

                        <TabPanel v-for="i in 6" :key="i + 3" :index="i + 3">
                            <div class="py-12">
                                <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                        <div class="p-6 text-gray-900 dark:text-gray-100">
                                            <h3 class="text-lg font-medium mb-4">Вкладка {{ i + 3 }}</h3>
                                            <p>Содержимое для вкладки {{ i + 3 }}.</p>
                                            <p class="mt-2">Активная вкладка: {{ activeTab }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>

                    <!-- Регистрируем вкладки -->
                    <div class="hidden">
                        <Tab :index="0" label="Dashboard" />
                        <Tab :index="1" label="Dashboard 2" />
                        <Tab :index="2" label="Analytics" />
                        <Tab :index="3" label="Reports" />
                        <Tab :index="4" label="Settings" />
                        <Tab :index="5" label="Users" />
                        <Tab :index="6" label="Orders" />
                        <Tab :index="7" label="Products" />
                        <Tab :index="8" label="Messages" />
                        <Tab :index="9" label="Help" />
                    </div>
                </template>
            </TabGroup>
        </template>
    </AuthenticatedLayout>
</template>
