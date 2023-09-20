import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const config = {
		plugins: [react(), viteTsconfigPaths()],
		base: '/',
		build: {
			outDir: 'dist',
		},
		server: {
			open: true,
			host: 'localhost',
			port: 3000,
		},
	};
	if (command !== 'serve') {
		config.base = '/VegDimensjoneringDemo/';
	}
	return config;
});
