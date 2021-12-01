import node from '@sveltejs/adapter-node';
//import adapter from '@sveltejs/adapter-static';
//import adapter from 'svelte-adapter-deno';

const config = {
	kit: {
		/*adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})*/

		/*adapter: adapter({
			// default options are shown
			out: 'build',
			deps: './node_modules/svelte-adapter-deno/deps.ts' // (relative to adapter-deno package)
		})*/

		adapter: node()
	}
};

export default config;
