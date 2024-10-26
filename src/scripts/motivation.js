const MOTIVATION_API_KEY = import.meta.env.VITE_MOTIVATION_API_KEY;

export function motivation() {
    // find a random topic from the categories list
    function randomTopic() {
        const categories = [
            "fitness",
            "life",
            "best",
            "change",
            "success",
            "attitude",
            "courage",
            "failure",
            "health",
            "inspirational",
        ];
        const randomIndex = Math.floor(Math.random() * categories.length);
        const topic = categories[randomIndex];
        return topic;
    }

    // Fetch data from API
    async function motivationApiFetch(topic) {
        // console.log(topic);
        const url = `https://api.api-ninjas.com/v1/quotes?category=${topic}`;

        const options = {
            method: "GET",
            headers: {
                "X-Api-Key": import.meta.env.VITE_MOTIVATION_API_KEY,
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const result = await response.json();
                // console.log(result);
                displayResults(result);
            } else {
                throw new Error(await response.text());
            }
        } catch (error) {
            console.error(error);
        }
    }
    // Listen for form submission
    motivationApiFetch(randomTopic());
}

// Display the results
function displayResults(result) {
    // console.log(result);

    // const colorClassMap = {
    //     life: "life",
    //     fitness: "fitness",
    //     best: "best",
    //     change: "change",
    //     success: "success",
    //     attitude: "attitude",
    //     courage: "courage",
    //     failure: "failure",
    //     health: "health",
    //     inspirational: "inspirational",
    // };

    // const colorClass = colorClassMap[result[0].category] || "";

    const quoteTemplate = `
    <article class="card-motivation">
        <div class="content">
            <p class="card-quote"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="quote-left" class="icon-quote" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z"></path></svg>${result[0].quote}</p>
            <h3 class="card-author">${result[0].author}</h3>
            
        </div>
        </article>
    `;
    // <p class="card-category">${result[0].category}</p>

    // Update the container once, after the loop
    document.querySelector("#motivation").innerHTML = quoteTemplate;
}
