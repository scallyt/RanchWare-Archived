<script lang="ts">
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
	<div>
		<form on:submit|preventDefault={submitForm} action="/login">
			<div>
				<label for="firstName">firstName</label>
				<input bind:value={user.firstName} maxlength="16" type="text" name="firstName" />
			</div>
			<div>
				<label for="lastName">lastName</label>
				<input bind:value={user.lastName} maxlength="16" type="text" name="lastName" />
			</div>
			<div>
				<label for="email">email</label>
				<input bind:value={user.email} type="email" name="email" />
			</div>
			<div>
				<label for="password">password</label>
				<input bind:value={user.password} min="8" type="password" name="pass" />
			</div>
			<button type="submit">Register</button>
		</form>
	</div>
	<a href="/login">Login</a>
</main>

<style lang="scss">
	@import '../../styles/register.scss';
</style>
