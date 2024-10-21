import { createClient } from "pexels";

// export function photos(type, muscle) {
//     // console.log(type);

//     const typeMap = {
//         strength: "conditioning, exercise",
//         strongman: "crossfit, body strength",
//         olympic_weightlifting: "weightlifting",
//     };

//     const queryType = typeMap[type] || type;

//     const client = createClient(import.meta.env.VITE_PREXELS_API_KEY);
//     const query = `fitness, ${queryType}, ${muscle}`;
//     // console.log(query);
//     async function getPhotos() {
//         try {
//             const photos = await client.photos.search({ query, per_page: 10 });
//             // console.log(photos);
//             return photos;
//         } catch (error) {
//             console.error("Error fetching photos:", error);
//         }
//     }

//     return getPhotos();
// }

export function photos(type, muscle) {
    const typeMap = {
        strength: "conditioning, exercise",
        strongman: "crossfit, body strength",
        olympic_weightlifting: "weightlifting",
    };

    const queryType = typeMap[type] || type;
    const query = `fitness, ${queryType}, ${muscle}`;
    const apiKey = import.meta.env.VITE_PREXELS_API_KEY; // Your API key

    async function getPhotos() {
        try {
            const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=10`, {
                headers: {
                    Authorization: apiKey
                }
            });
            const data = await response.json();
            return data;  
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }

    return getPhotos();
}

