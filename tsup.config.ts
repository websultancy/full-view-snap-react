import { defineConfig } from 'tsup'
import { copyFileSync } from 'fs'
import { spawn } from 'child_process'

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
	onSuccess: async () => {
		// Copy CSS file after build
		try {
			copyFileSync('src/index.css', 'dist/index.css')
			console.log('✓ CSS copied to dist/index.css')
		} catch (error) {
			console.error('Failed to copy CSS:', error)
		}
		// Push to yalc after build (non-blocking)
		try {
			const yalcProcess = spawn('yarn', ['yalc', 'push'], {
				stdio: 'inherit',
				shell: true,
				detached: false
			})
			yalcProcess.on('error', (error) => {
				console.error('Failed to spawn yalc push:', error)
			})
			yalcProcess.on('exit', (code) => {
				if (code !== 0) {
					console.error(`yalc push exited with code ${code}`)
				} else {
					console.log('✓ Pushed to yalc')
				}
			})
		} catch (error) {
			console.error('Failed to run yalc push:', error)
		}
	},
})


