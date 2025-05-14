<template>
	<main class="page-login">
		<loginForm />
	</main>
</template>

<script>
import { defineComponent } from 'vue';
import loginForm from '@/components/loginForm.vue';

export default defineComponent({
	components: {
		loginForm,
	},
});
</script>

<style lang="scss" scoped>
	.page-login {
		padding-top: 15%;

		@media (min-width: 769px) {
			padding-top: 200px;
		}
	}
</style>