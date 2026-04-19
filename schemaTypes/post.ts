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
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    // 1. Instagram URL用の項目を追加
    {
      name: 'insta_url',
      type: 'url',
      title: 'InstagramのURL',
      description: 'リール動画や投稿のURLを貼り付けてください',
    },

    // 2. ギャラリー画像用の項目を追加（複数枚）
    {
      name: 'gallery_images',
      type: 'array',
      title: 'ギャラリー画像',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid', // 管理画面でグリッド表示されて見やすくなります
      },
    },
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
