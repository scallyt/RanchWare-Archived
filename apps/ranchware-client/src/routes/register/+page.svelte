<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';

	let isFocused: boolean = true;
	let user = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	function submitForm(event: any) {
		event.preventDefault();

		axios
			.post('http://localhost:3100/api/auth/signup', {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				password: user.password
			})
			.then(function (response) {
				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	}
</script>

<h1>Register</h1>

<main>
	<div class="div">
		<div class="brd">
			<form on:submit|preventDefault={submitForm} action="/login">
				<div class="l-i">
					<label class="lable" for="firstName">firstName</label>
					<input bind:value={user.firstName} maxlength="16" type="text" name="firstName" />
				</div>
				<div class="l-i">
					<label class="lable" for="lastName">lastName</label>
					<input bind:value={user.lastName} maxlength="16" type="text" name="lastName" />
				</div>
				<div class="l-i">
					<label class="lable" for="email">email</label>
					<input bind:value={user.email} type="email" name="email" />
				</div>
				<div class="l-i">
					<label class="lable" for="password">password</label>
					<input bind:value={user.password} min="8" type="password" name="pass" />
				</div>
				<div class="center">
					<button on:click={submitForm} class="btn btn-primary" type="submit">Register</button>
					<button class="btn btn-primary" on:click={() => {goto('/login')}}>Login</button>
				</div>
			</form>
		</div>
	</div>
</main>

<style lang="scss">
	@import '../../styles/register.login.scss';
</style>
