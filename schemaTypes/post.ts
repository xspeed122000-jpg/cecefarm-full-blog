import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    // --- ここに言語設定を追加 ---
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
      initialValue: 'jp', // 最初からJPを選択状態にする
    }),

    defineField({
      name: 'isPopular',
      title: 'Popular Article (Display on Top Page)',
      type: 'boolean',
      initialValue: false, // 最初はオフに設定
    }),

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

        // 👇 ここからを差し替えてみてください
        isUnique: async (slug, context) => {
          const { document, getClient } = context;

          // 1. TypeScriptの「undefinedかもしれない」エラーを防ぐための安全ガード
          if (!document) return true;

          const client = getClient({ apiVersion: '2023-01-01' });
          const id = document._id.replace(/^drafts\./, '');

          // 2. ドキュメントから言語設定を取得（TypeScriptのエラーを防ぐため (document as any) と記述しています）
          // ※もしSanity内で言語を選んでいる項目の名前（name）が 'lang' の場合は、以下の .language を .lang に書き換えてください。
          const currentLanguage = (document as any).language || 'jp';

          // 3. 「同じ言語の枠内」だけで重複をチェックするGROQクエリ
          const query = `*[_type == $type && slug.current == $slug && language == $language && _id != $id && !(_id in [ $id, "drafts." + $id ])][0]`;
          const params = {
            type: document._type,
            slug,
            language: currentLanguage,
            id,
          };

          const result = await client.fetch(query, params);

          // 他に同じ言語で同じSlugが見つからなければ、重複なしとしてPublishを許可
          return !result;
        },
        // 👆 ここまで
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
