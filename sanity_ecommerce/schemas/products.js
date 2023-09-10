import { number } from "prop-types"

const productVariant = {
    name: 'productVariant',
    title: 'Product Variant',
    type: 'object',
    fields: [
        {
            name: 'variantName',
            title: 'Variant Name',
            type: 'string',
            validation: Rule => Rule.required().error('Variant Name is required.')
        },
        {
            name: 'variantPrice',
            title: 'Variant Price',
            type: 'number',
            validation: Rule => Rule.required().error('Variant Price is required.')
        },
        {
            name: 'variantImages',
            title: 'Variant Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            }
        }
    ],
    preview: {
        select: {
            title: 'variantName',
            media: 'variantImages.0.asset',
        },
    },
}

export default {
    name: 'products',
    title: 'Products',
    type: 'document',
    fields: [
        {
            name: 'nameShort',
            title: 'Name Short',
            type: 'string',
            description: 'For most places where the product name appears.',
            validation: Rule => Rule.required().error('Product Name Short is required.')
        },
        {
            name: 'nameLong',
            title: 'Name Long',
            type: 'string',
            description: 'For the product page name specifically.',
            validation: Rule => Rule.required().error('Product Name Long is required.')
        },
        {
            name: 'images',
            title: 'Images',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            },
            validation: Rule => Rule.required().error('At least one image is required.')
        },
        {
            name: 'variantTitle',
            title: 'Variant Title (if necessary)',
            type: 'string'
        },
        {
            name: 'variants',
            title: 'Variants (if necessary)',
            type: 'array',
            of: [productVariant]
        },
        {
            name: 'showVariantImagesFirst',
            title: 'Show Variant Images First (if necessary)',
            type: 'boolean',
            description: 'Toggle ON to show variant images before product images. Toggle OFF to show product images first.',
            initialValue: false
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'nameShort',
                maxLength: 90,
            },
            validation: Rule => Rule.required().error('Slug is required.')
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().error('Price is required.')
        }, {
            name: 'productDetails',
            title: 'Product Details',
            type: 'text',
            validation: Rule => Rule.required().error('Product Details are required.')
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: Rule => Rule.required().error('Description is required.')
        },
        {
            name: 'readMore',
            title: 'Read More',
            type: 'text',
            description: 'Additional details about the product. Supports multiple lines.'
        },
        {
            name: 'productCategory',
            title: 'Product Category',
            type: 'reference',
            to: [{ type: 'productCategories' }],
            validation: Rule => Rule.required().error('Product Category is required.')
        },
        {
            name: 'reviewStars',
            title: 'Review Stars',
            type: 'number',
            validation: Rule => Rule
                .optional()
                .min(1, 'Review Stars must be an integer between 1 and 5.')
                .max(5, 'Review Stars must be an integer between 1 and 5.')
                .integer('Review Stars must be an integer between 1 and 5.')
        },
        {
            name: 'numOfReviews',
            title: 'Number of Product Reviews',
            type: 'number'
        },
        {
            name: 'isBestSeller',
            title: 'Is Best Seller',
            type: 'boolean',
            validation: Rule => Rule.required().error('Please specify if the product is a best seller.')
        }
    ]
}
