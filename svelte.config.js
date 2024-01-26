import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
	  adapter: adapter({
		maxDuration: 120,
	  }),
	},

  };
  
  export default config;