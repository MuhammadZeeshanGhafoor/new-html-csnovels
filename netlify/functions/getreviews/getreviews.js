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



const handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: 'Preflight OK',
        };
    }

    const slug = event.queryStringParameters.slug;

    try {


        const { data, error } = await supabaseCli
            .from('reviews')
            .select("*")
            .eq("slug", slug);

        if (error) {
            throw new Error(error.message);
        }




        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "newly fetched", book: data }),
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
