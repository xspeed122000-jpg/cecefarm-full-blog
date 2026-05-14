// sanity.cli.ts の中身
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '88s4pwup',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  }
})