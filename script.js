document.getElementById("generateBtn").addEventListener("click", fetchData);

function fetchData() {
    const imageAPI = "https://picsum.photos/600/300"; // Random image API
    const greetingAPI = "https://api.api-ninjas.com/v1/quotes"; // API-Ninjas Quotes API
    const apiKey = "pwvp8t1Yt7r6BL14k56LLw==a3w85m1RDIdniGj9"; //  API key

    // Fetch image
    const imagePromise = fetch(imageAPI)
        .then(response => {
            document.getElementById("image").src = response.url;
            return response.url;
        });

    // Fetch random quote (as greeting)
    const greetingPromise = fetch(greetingAPI, {
        headers: {
            "X-Api-Key": apiKey // Correct API key header
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            return data[0].quote; // Extract the first quote
        } else {
            return "Hello!"; // Fallback greeting
        }
    })
    .catch(() => {
        const fallbackGreetings = ["Hello!", "Good Day!", "Hey there!", "Greetings!", "Howdy!", "What's up?"];
        return fallbackGreetings[Math.floor(Math.random() * fallbackGreetings.length)];
    });

    // Handle both promises
    Promise.all([imagePromise, greetingPromise])
        .then(([imageUrl, greeting]) => {
            document.getElementById("greeting").innerText = greeting;
        })
        .catch(error => console.error("Error fetching data:", error));
}


