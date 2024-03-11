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
		}).then(async function (response) {
            console.log(response)
			await goto('/')
        }).catch( function (error) {
            console.log(error);
        })
	}
</script>

<h1>Login</h1>

<main>
	<div class="div">
		<div class="brd">
			<form on:submit|preventDefault={submitForm} action="/login">
				<div class="l-i">
					<label class="lable" for="email">email</label>
					<input bind:value={user.email} type="email" name="email" />
				</div>
				<div class="l-i">
					<label class="lable" for="password">password</label>
					<input bind:value={user.password} min="8" type="password" name="pass" />
				</div>
				<div class="center">
					<button class="btn btn-primary" on:click={ async () => { await goto('/register')}}>Register</button>
					<button on:click={submitForm} class="btn btn-primary" type="submit">Login</button>
				</div>
			</form>
		</div>
	</div>
</main>

<style lang="scss">
	@import '../../styles/register.login.scss';
</style>
