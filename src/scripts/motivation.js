export function motivation() {
    // Listen for form submission
    motivationApiFetch();
    async function motivationApiFetch() {
        // const url = `https://zenquotes.io/api/quotes/`;
        const url = 'https://type.fit/api/quotes';
        try {
            const response = await fetch(url);
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
}

function displayResults(result) {
    console.log(result);
    // let cardsHTML = ""; // Accumulate the HTML here

    // const quoteTemplate = `
    // `

    // // Update the container once, after the loop
    // document.querySelector(".cards").innerHTML = cardsHTML;
}
