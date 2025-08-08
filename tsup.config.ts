import 'dotenv/config';
import { defineConfig } from 'tsup';



const ENV: string = process.env.ENV ?? 'production'



export default defineConfig(
{
	entry: ['./src/index.ts'],
	outDir: './dist',
	format: ['cjs', 'esm'],
	dts: true,
	splitting: true,
	sourcemap: true,
	clean: true,
	minify: ENV === 'development' ? false : true,
});
