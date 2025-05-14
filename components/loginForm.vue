<template>
	<section class="login-form">
		<provet-avatar class="n-margin-be-l" name="Avatar" size="xxxl"></provet-avatar>
		
		<form @submit.prevent="handleSubmit" autocomplete="off">
			<!-- Email Input -->
			<div class="form-group" aria-labelledby="email-input">
				<provet-input
					v-model="form.email"
					type="email"
					placeholder="Enter your email"
					size="l"
					expand
					required
					hideRequired
					autocomplete="off"
					data-1p-ignore
				>
					<provet-icon slot="start" name="generic-mail" color="var(--light-color)"></provet-icon>
				</provet-input>

				<span v-if="emailError" class="error">{{ emailError }}</span>
			</div>

			<!-- Password Input -->
			<div class="form-group password-form" aria-labelledby="password-input">
				<provet-input
					v-model="form.password"
					:type="passwordVisible ? 'text' : 'password'"
					placeholder="Enter your password"
					size="l"
					expand
					required
					hideRequired
					autocomplete="new-password"
					data-1p-ignore
				>
					<provet-icon slot="start" name="interface-lock" color="var(--light-color)"></provet-icon>
				</provet-input>

				<provet-icon 
					tabindex="0"
					class="show-password" 
					:name="`interface-edit-${passwordVisible ? 'on' : 'off'}`" 
					@click="togglePasswordVisibility">
				</provet-icon>
				
				<span v-if="passwordError" class="error">{{ passwordError }}</span>
			</div>

			<!-- Checkbox for product updates -->
			<div class="form-group">
				<provet-checkbox
					v-model="form.receiveUpdates"
					:checked="form.receiveUpdates"
					label="Receive occasional product updates and announcements"
				>
				</provet-checkbox>
			</div>

			<!-- Submit Button -->
			<provet-button type="submit" variant="primary" expand size="l" :disabled="loading">Sign Up</provet-button>
		</form>
	</section>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	interface LoginForm {
		email: string;
		password: string;
		receiveUpdates: boolean;
	}

	const form = ref<LoginForm>({
		email: '',
		password: '',
		receiveUpdates: false,
	});

	const router = useRouter();
	const emailError = ref('');
	const passwordError = ref('');
	const loading = ref(false);
	const passwordVisible = ref(false);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const user = useState('user', () => ({
		email: '',
	}));

	// Form validation logic
	const validateForm = () => {
		emailError.value = '';
		passwordError.value = '';

		let isValid = true;

		// Email validation
		if (!form.value.email) {
			emailError.value = 'Email is required';
			isValid = false;
		} else if (!emailRegex.test(form.value.email)) {
			emailError.value = 'Please enter a valid email address';
			isValid = false;
		}

		// Password validation
		if (!form.value.password) {
			passwordError.value = 'Password is required';
			isValid = false;
		}

		return isValid;
	};

	// Handle form submission
	const handleSubmit = () => {
		if (!validateForm()) return;

		loading.value = true;

		// Simulate a login request (use real API here)
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form.value),
		})
		.then(response => {
			if (!response.ok) {
				emailError.value = 'Login failed. Please try again.';
			}
			return response.json();
		})
		.then(() => {
			user.value.email = form.value.email;
			router.push('/auth/success');
		});
	};

	// Toggle password visibility
	const togglePasswordVisibility = () => {
		passwordVisible.value = !passwordVisible.value;
	};
</script>

<style lang="scss" scoped>
	.login-form {
		.form-group {
			margin-bottom: 10px;

			provet-input {
				--n-input-background: var(--section-bg);
				--n-input-border-color: transparent;
				--n-input-color: var(--light-color);
			}

			provet-checkbox {
				--n-label-color: var(--light-color);
			}

			&.password-form {
				position: relative;
				margin-bottom: 35px;

				.show-password {
					position: absolute;
					right: 15px;
					top: 35px;
					color: var(--light-color);
					cursor: pointer;
				}
			}

			.error {
				color: var(--error-color);
				font-size: 12px;
			}
		}
	}
</style>
