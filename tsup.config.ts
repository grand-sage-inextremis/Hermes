import 'dotenv/config';
import { defineConfig, Options } from 'tsup';



const ENV: string = process.env.ENV ?? 'production'



const TSUP_CONFIG: Options = {
	entry: ['./src/index.ts'],
	outDir: './dist',
	format: ['cjs', 'esm'],
	target: "es2022",
	dts: true,
	splitting: true,
	sourcemap: true,
	clean: true,
	minify: true
};



if (ENV === 'development')
{
	TSUP_CONFIG.minify = false;
}


if (ENV === 'test')
{
	TSUP_CONFIG.entry = ['./src/index.test.ts'];
	TSUP_CONFIG.outDir = './build-test';
}



export default defineConfig(TSUP_CONFIG);
