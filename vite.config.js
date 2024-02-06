import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { version } from './package.json'

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
		  output: {
			  entryFileNames: `[name].js?v=${version}`,
			  chunkFileNames: `[name].js?v=${version}`,
			  assetFileNames: `[name].[ext]?v=${version}`
		  }
		}
	  }
	/*
	ssr: {
		noExternal: ["bootstrap-italia"], // add all tsparticles libraries here, they're not made for SSR, they're client only
	  }
	  */
});
