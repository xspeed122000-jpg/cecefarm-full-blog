import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    // 1. 文章（テキスト入力）の設定
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [{ title: 'Bullet', value: 'bullet' }],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
    }),

    // 2. SNS埋め込みの設定
    defineArrayMember({
      type: 'object',
      name: 'socialEmbed',
      title: 'SNS Embed',
      fields: [
        {
          name: 'url',
          type: 'url',
          title: 'URL',
          description: 'X(Twitter)やInstagramの投稿URLを貼ってください'
        },
        {
          name: 'platform',
          type: 'string',
          title: 'Platform',
          options: {
            list: [
              { title: 'X (Twitter)', value: 'twitter' },
              { title: 'Instagram', value: 'instagram' },
            ]
          }
        }
      ]
    }),

    // 3. 画像の設定
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})