// schemaTypes/customHtml.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'customHtml',
  title: 'Custom HTML',
  type: 'object',
  fields: [
    defineField({
      name: 'html',
      title: 'HTML Code',
      type: 'text',
      description: 'アフィリエイトコードや埋め込みコードをここに貼り付けてください'
    })
  ]
})