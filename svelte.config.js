import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
	  adapter: adapter({
		maxDuration: 120
	  }),
	},
	preprocess: [vitePreprocess({})],

  };
  
  export default config;