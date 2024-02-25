<script lang="ts">
	import axios from 'axios';

	function submitForm(event: any) {
		event.preventDefault();

		const formData = new FormData(event.target);

		const firstName = formData.get('firstName');
		const email = formData.get('email');
		const lastName = formData.get('lastName');
        const pass = formData.get('pass');

		// Process the data
		console.log(`Name: ${firstName}`);
		console.log(`Email: ${email}`);
		console.log(`Last Name: ${lastName}`);

		axios.post('http://localhost:3100/api/auth/signup', {
			firstName: firstName,
            lastName: lastName,
            email: email,
            password: pass,
		}).then(function (response) {
            console.log(response)
        }).catch( function (error) {
            console.log(error);
        })
	}
</script>

<h1>Register</h1>

<main>
	<div>
		<form on:submit|preventDefault={submitForm} action="/login">
			<div>
				<label for="firstName">firstName</label>
				<input maxlength="16" type="text" name="firstName" />
			</div>
			<div>
				<label for="lastName">lastName</label>
				<input maxlength="16" type="text" name="lastName" />
			</div>
			<div>
				<label for="email">email</label>
				<input type="email" name="email" />
			</div>
			<div>
				<label for="password">password</label>
				<input min="8" type="password" name="pass" />
			</div>
			<button type="submit">Register</button>
		</form>
	</div>
        <a href="/login">Login</a>
</main>

<style lang="scss">
	@import '../../styles/register.module.scss';
</style>
