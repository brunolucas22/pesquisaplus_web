import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: true,
		port: 7155,
		strictPort: true,
		open: '/login',
		cors: false,
		hmr: {
			overlay: false,
		},
	},
	css: {
		modules: {
			generateScopedName: '[name]__[local]___[hash:base64:5]',
		},
	},
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router-dom'],
	},
	plugins: [react(), viteTsconfigPaths()],
	build: {
		rollupOptions: {
			external: ['xlsx'],
			output: {
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
					lodash: ['lodash'],
				},
			},
		},
	},
});
