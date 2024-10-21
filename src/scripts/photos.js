import { createClient } from "pexels";

export function photos(type) {
    // console.log(type);

    const typeMap = {
        strength: "conditioning, exercise",
        strongman: "crossfit, body strength",
        olympic_weightlifting: "weightlifting",
    };

    const queryType = typeMap[type] || type;

    const client = createClient(import.meta.env.VITE_PREXELS_API_KEY);
    const query = `fitness, ${queryType}`;
    // console.log(query);
    async function getPhotos() {
        try {
            const photos = await client.photos.search({ query, per_page: 10 });
            // console.log(photos);
            return photos;
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }

    return getPhotos();
}
