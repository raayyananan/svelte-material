// import { components } from '../../data';
import { images } from '../../data';


export function load() {
    return {
        images: images.map((image) => ({
            name: image.title,
            url: image.url, 
            slug: image.slug
        }))
    };
}

