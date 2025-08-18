import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	outDir: 'dist',
	format: ['cjs'],
	splitting: false,
	sourcemap: true,
	clean: true,
	dts: true,
	minify: false,
	// Do NOT externalize these so they are bundled
	external: ['react', 'react-dom'],
	noExternal: ['@juggle/resize-observer', '@react-hook/resize-observer'],
	injectStyle: true,
	target: 'es2018',
	platform: 'browser',
	treeshake: true,
})


