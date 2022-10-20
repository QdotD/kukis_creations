// sanity client
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


// immediately export sanity client and allows us to use sanityClient anywhere in our code
export const client = sanityClient({
	projectId: 'izde7eb5', // so sanity knows which project to connect us with
	dataset: 'production', // development or production?
	apiVersion: '2022-03-10',
	useCdn: true,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
	ignoreBrowserTokenWarning: true
})

// allows us to use the sanity images
const builder = imageUrlBuilder(client);

// allows us to pass in the client we just created to sanity
export const urlFor = (source) => builder.image(source);