import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import commonjs from "@rollup/plugin-commonjs" 

export default defineConfig({
	plugins: [sveltekit()],
	
	build: {
		rollupOptions: {
		  plugins: [commonjs()]
		},
	  },
	  optimizeDeps: {
		include: ['api-contract/**/*']
	  },
	  server: {
		proxy: {
		  '/api': {
			target: 'http://localhost3200', // Local Nest-App
			changeOrigin: true
		  },
		},
	  },
});
