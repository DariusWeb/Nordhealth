<template>
    <div class="outer-section">
        <section class="success-page">
            <h1 class="n-margin-be-xl">Welcome!</h1>
            <p v-html="successMessage"></p>
            <provet-button
                class="n-margin-bs-xl"
                variant="primary"
                expand
                size="l"
                @click="$router.push('/auth/login')"
            >
                Go back to Sign Up
            </provet-button>
        </section>
    </div>
</template>

<script setup lang="ts">
    const user = useState<{ email: string }>('user', () => ({ email: '' }));
    const successMessage: string = `🎉 Congratulations! You have successfully logged in with the email: <h3>${user.value.email}</h3>`;
</script>

<style lang="scss" scoped>
    .outer-section {
        padding-top: 200px;

        .success-page {
            font-size: 20px;
            color: var(--light-color);
        }
    }
</style>