import 'dotenv/config';
import { defineConfig, Options } from 'tsup';



const ENV: string = process.env.ENV ?? 'production';



const commonConfig: Options = {
	outDir: './dist',
	target: "es2022",
	dts: true,
	splitting: false,
	sourcemap: false,
	clean: true,
	minify: true
};



if (ENV === 'development')
{
	commonConfig.minify = false;
	commonConfig.sourcemap = true;
}



export default defineConfig([
	{
		...commonConfig,
		entry: ['./src/index.ts'],
		format: ['cjs', 'esm']
	},
	{
		...commonConfig,
		entry: { 'index': './src/index.iife.ts' },
		format: ['iife'],
		globalName: 'Hermes'
	}
]);
