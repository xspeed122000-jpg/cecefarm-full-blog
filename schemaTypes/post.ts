import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: '検索結果に表示されるタイトル（空欄の場合は通常のタイトルが使用されます）',
      validation: (Rule) => Rule.max(60).warning('60文字以内が推奨されます'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: '検索結果に表示される紹介文を入力してください（160文字程度推奨）',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    // 1. Instagram URL
    defineField({
      name: 'insta_url',
      type: 'url',
      title: 'InstagramのURL',
      description: 'リール動画や投稿のURLを貼り付けてください',
    }),
    // schemaTypes/post.ts (または item.ts)

    // 修正後
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'table' },
        { type: 'customHtml' }, // ★名前だけで呼び出せるようになります
      ],
    }),
    // 2. ギャラリー画像
    defineField({
      name: 'gallery_images',
      type: 'array',
      title: 'ギャラリー画像',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid',
      },
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
