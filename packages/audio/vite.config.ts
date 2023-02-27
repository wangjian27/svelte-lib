import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import VitePluginStyleInject from 'vite-plugin-style-inject';
import VitePluginCompression from 'vite-plugin-compression';

import path from 'path';
export default defineConfig(({ command, mode }) => {
  const common = {
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, '/src') }]
    },
    server: {
      port: 4000,
      open: true,
      cors: true,
      host: '127.0.0.1',
      // 设置代理，根据我们项目实际情况配置
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false,
          rewrite: (path: string) => path.replace('/api/', '/')
        }
      }
    }
  };

  if (command === 'serve') {
    return {
      plugins: [svelte({})],
      ...common
    };
  }

  if (command === 'build') {
    return {
      ...common,
      plugins: [svelte({}), VitePluginStyleInject(), VitePluginCompression()],
      build: {
        // 是否将css也打入到js中
        cssCodeSplit: true,
        lib: {
          entry: path.resolve(__dirname, 'src/lib/index.ts'),
          name: 'audioPlayer',
          fileName: (format) => `audiocomponent.${format}.js`
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            // globals: {
            //   unocss: 'unocss'
            // }
          }
        }
      }
    };
  }
});
