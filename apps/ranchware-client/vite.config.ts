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
		port: 4200,
		proxy: {
		  '/api': {
			target: 'http://localhost3100', // Local Nest-App
			changeOrigin: true
		  },
		},
	  },

});
