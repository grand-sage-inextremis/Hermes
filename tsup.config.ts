import 'dotenv/config';
import { defineConfig, Options } from 'tsup';



const ENV: string = process.env.ENV ?? 'production'



const TSUP_CONFIG: Options = {
	entry: ['./src/index.ts'],
	outDir: './dist',
	format: ['cjs', 'esm'],
	target: "es2022",
	dts: true,
	splitting: false,
	sourcemap: false,
	clean: true,
	minify: true
};



if (ENV === 'development')
{
	TSUP_CONFIG.minify = false;
	TSUP_CONFIG.sourcemap = true;
}



export default defineConfig(TSUP_CONFIG);
