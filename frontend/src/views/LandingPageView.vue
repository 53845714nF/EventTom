<template>
    <div>
        <h1>Ich bin eine h1</h1>
        <h2>Ich bin eine h2</h2>
        <h3>Ich bin eine h3</h3>
        <h4>Ich bin eine h4</h4>
        <p>Ich bin ein normaler Text</p>
        <p class="p-large">Ich bin ein großer Text</p>
        <RouterLink to="/dashboard">Go to AppDashboard</RouterLink> <!-- This is a link to a View. the to="" parameter must reference a valid path from /router/index.js -->
    </div>
</template>

<style scoped>
div{
    justify-content: center;
}
</style>