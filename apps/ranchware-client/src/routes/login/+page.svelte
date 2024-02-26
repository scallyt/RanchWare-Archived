<script lang="ts">
	import { goto } from '$app/navigation';
	import axios from 'axios';

	

	let user = {
		email: '',
		password: '' 
	}

	async function submitForm(event: any) {
		event.preventDefault();

		axios.post('http://localhost:3100/api/auth/signin', {
            email: user.email,
            password: user.password,
		}).then(function (response) {
            console.log(response)
			goto('/')
        }).catch( function (error) {
            console.log(error);
        })
	}
</script>

<h1>Login</h1>

<main>
	<div>
		<form on:submit|preventDefault={submitForm} action="/login">
			<div>
				<label for="email">email</label>
				<input bind:value={user.email} type="email" name="email" />
			</div>
			<div>
				<label for="password">password</label>
				<input bind:value={user.password} min="8" type="password" name="pass" />
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
        <a href="/register">Register</a>
</main>

<style lang="scss">
	@import '../../styles/register.module.scss';
</style>
