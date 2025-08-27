import { defineConfig } from 'vite';



export default defineConfig({
	test: {
		globals: true,
		reporters: ['verbose'],
		watch: false,
		include: [
			'./src/**/*.test.ts',
			'./src/**/*.test.tsx'
		]
	}
});
