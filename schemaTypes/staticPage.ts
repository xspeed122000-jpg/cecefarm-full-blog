// schemaTypes/staticPage.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'staticPage',
  title: 'Static Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Japanese', value: 'jp' },
          { title: 'English', value: 'en' },
          { title: 'Thai', value: 'th' },
        ],
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }, { type: 'table' }, { type: 'customHtml' }],
    }),
  ],
})