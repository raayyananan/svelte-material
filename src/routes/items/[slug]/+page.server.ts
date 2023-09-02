// import { components } from '../../../data';
import { images } from '../../../data';
import { error } from '@sveltejs/kit';

interface Params {
    slug: string
}

export function load({params}: {params: Params}) {
    const image = images.find((component) => component.slug === params.slug);

    if (!image) throw error(404);

    return {
        image: image
    };
}
