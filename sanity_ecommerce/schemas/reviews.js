export default {
    name: 'reviews',
    title: 'Reviews',
    type: 'document',
    fields: [
        {
            name: 'reviewerImage',
            title: 'Reviewer Image',
            type: 'image',
            validation: Rule => Rule.required().error('Reviewer Image is required.'),
            options: {
                hotspot: true,
            }
        },
        {
            name: 'reviewerName',
            title: 'Reviewer Name',
            type: 'string',
            validation: Rule => Rule.required().error('Reviewer Name is required.')
        },
        {
            name: 'reviewDesc',
            title: 'Review Description',
            type: 'string',
            validation: Rule => Rule.required().error('Review Description is required.')
        },
        {
            name: 'reviewStars',
            title: 'Review Stars',
            type: 'number',
            validation: Rule => Rule.required()
                .min(1)
                .max(5)
                .integer()
                .error('Review Stars must be an integer between 1 and 5.')
        },
        {
            name: 'reviewDate',
            title: 'Review Date',
            type: 'date',
            validation: Rule => Rule.required().error('Review Date is required.')
        }
    ]
}
