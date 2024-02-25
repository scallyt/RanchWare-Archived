<script lang="ts">
	import axios from 'axios';

	function submitForm(event: any) {
		event.preventDefault();

		const formData = new FormData(event.target);

		const email = formData.get('email');
        const pass = formData.get('pass');


		axios.post('http://localhost:3100/api/auth/signin', {
            email: email,
            password: pass,
		}).then(function (response) {
            console.log(response)
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
				<input type="email" name="email" />
			</div>
			<div>
				<label for="password">password</label>
				<input min="8" type="password" name="pass" />
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
        <a href="/register">Register</a>
</main>

<style lang="scss">
	@import '../../styles/register.module.scss';
</style>
