import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Master Extension',
    permissions: ['storage'],
    host_permissions: ['*://*.firebaseio.com/*', '*://*.googleapis.com/*'],
    entries: {
      background: 'src/entrypoints/background.ts',
      popup: 'src/entrypoints/popup.tsx',
      firebase: 'src/entrypoints/firebase.ts'
    }
  }
});


