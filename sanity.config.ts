import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { media } from 'sanity-plugin-media'

export default defineConfig({
  name: 'default',
  title: 'cecefarm-web',

  projectId: '88s4pwup',
  dataset: 'production',

  basePath: '/studio',

  plugins: [structureTool(), visionTool(), media(),],

  schema: {
    types: schemaTypes,
  },
})
