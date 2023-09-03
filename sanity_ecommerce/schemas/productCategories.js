export default {
    name: 'productCategories',
    title: 'Product Categories',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Category Name',
            validation: Rule => Rule.required()
        }
    ],
    preview: {
        select: {
            title: 'title',
        },
    }
};
