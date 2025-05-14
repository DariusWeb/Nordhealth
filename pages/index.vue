<template>
	<div></div> <!-- Empty template to avoid missing template error -->
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
    // Redirect to /auth/login when the root page is accessed
    router.push('/auth/login');
</script>