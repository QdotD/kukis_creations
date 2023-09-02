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
            }
        },
        {
            name: 'url',
            title: 'URL',
            type: 'string',
            description: 'example: /product/jiji-keychain',
            validation: Rule => Rule.required().error('URL is required.')
        },
        {
            name: 'altText',
            title: 'Alt Text',
            type: 'string',
            description: 'Description for accessibility and SEO.',
            validation: Rule => Rule.required().error('Alt Text is required.')
        },
        {
            name: 'imageTitle',
            title: 'Image Title',
            type: 'string',
            validation: Rule => Rule.required().error('Image Title is required.')
        }

    ],
    preview: {
        select: {
            title: 'imageTitle',  // Preview the title of the image
            media: 'image.asset',  // Preview the actual image
        },
    },
};
