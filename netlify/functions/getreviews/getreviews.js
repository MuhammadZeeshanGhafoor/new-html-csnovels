const { createClient } = require("@supabase/supabase-js");

const supabaseCli = createClient(
    process.env.P_URI,
    process.env.ANON_KEY
);

const headers = {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5501', // Allow requests from specified origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow various HTTP methods
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow certain headers
};

let reviewsCache = [];

const handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: 'Preflight OK', // Respond to preflight
        };
    }

    const slug = event.queryStringParameters.slug;

    try {
        if (reviewsCache.length > 0) {
            console.log("Using cached reviews");
            const book = reviewsCache.filter((item) => item.slug === slug);

            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ message: "from cache", book: book }),
            };
        }

        const { data, error } = await supabaseCli
            .from('reviews')
            .select("*");

        if (error) {
            throw new Error(error.message);
        }

        // reviewsCache = data;

        const book = data.filter((item) => item.slug === slug);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "newly fetched", book: book, date: new Date() }),
        };

    } catch (error) {
        console.error("Error fetching reviews:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message }),
        };
    }
}

module.exports = { handler };
