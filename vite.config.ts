import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default ({ mode }: { mode: string }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  // Use proxy if CORS is disabled on API.
  const proxyConfig = {
    '/api': {
      target: process.env.VITE_SENSOR_SERVICE_BASE_URL || '',
      changeOrigin: true,
      secure: false,
      //rewrite: path => path.replace(/^\/api/, '')
    }
  };

  return defineConfig({
    server: {
      ...(process.env.VITE_ENABLE_PROXY ? { proxy: proxyConfig } : {}),
    },
    plugins: [react()],
  })
}
