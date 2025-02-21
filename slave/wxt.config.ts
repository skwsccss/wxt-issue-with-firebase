import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Slave Extension',
    version:'1.0.0',
    permissions: ['storage', 'background', 'alarms'],
    host_permissions: ['*://*.firebaseio.com/*', '*://*.googleapis.com/*'],
  }
});
