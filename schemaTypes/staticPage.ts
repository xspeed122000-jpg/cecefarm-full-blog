import { defineField, defineType, getPublishedId } from 'sanity'

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
            options: {
                source: 'title',
                maxLength: 96,

                isUnique: async (slug, context) => {
                    const { document } = context;

                    if (!slug || !document?.language || !document?._id) {
                        return true;
                    }

                    const client = context.getClient({
                        apiVersion: '2025-02-19',
                    });

                    const publishedId = getPublishedId(document._id);

                    const query = `
        !defined(*[
            _type == "staticPage"
            && language == $language
            && slug.current == $slug
            && _id != $id
            && _id != $publishedId
        ][0]._id)
    `;

                    return await client.fetch(query, {
                        language: document.language,
                        slug,
                        id: document._id,
                        publishedId,
                    });
                },
            },
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
            of: [
                { type: 'block' },
                { type: 'image' },
                { type: 'table' },
                { type: 'customHtml' },
            ],
        }),
    ],
})