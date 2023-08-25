export default {
    name: 'carouselContent',
    title: 'Carousel Content',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            validation: Rule => Rule.required().error('Image is required.'),
            options: {
                hotspot: true
            },
            fields: [
                {
                    name: 'altText',
                    title: 'Alt Text',
                    type: 'string',
                    description: 'Description for accessibility and SEO.',
                    validation: Rule => Rule.required().error('Alt Text is required.')
                },
                {
                    name: 'title',
                    type: 'string',
                    title: 'Image Title',
                    validation: Rule => Rule.required().error('Image Title is required.')
                }
            ]
        }
    ],
    preview: {
        select: {
            title: 'image.title',  // Preview the title of the image
            media: 'image.asset',  // Preview the actual image
        },
    },
};
