const { createClient } = require("@supabase/supabase-js");

const supabaseCli = createClient(
    process.env.P_URI,
    process.env.ANON_KEY
);

const handler = async (event) => {
    // Logging the incoming event
    // console.log(event);

    // Define CORS headers
    const headers = {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5501/', // Allow requests from specific origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow various HTTP methods
    };

    // Handle OPTIONS request for preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: 'Preflight OK', // Respond to preflight
        };
    }

    // Extract slug from query parameters
    const slug = event.queryStringParameters.slug;

    try {
        // Set the page size for pagination
        const PAGE_SIZE = 1000;

        // Fetch the total count of records matching the slug
        const { count: totalCount } = await supabaseCli
            .from('chapters')
            .select('count', { count: 'exact' })
            .eq("slug", slug);

        // Calculate the number of pages needed based on the total count and page size
        const totalPages = Math.ceil(totalCount / PAGE_SIZE);

        // Fetch all records by paginating through each page
        let allData = [];
        for (let page = 1; page <= totalPages; page++) {
            const { data: pageData, error } = await supabaseCli
                .from('chapters')
                .select("chapternumber, slug")
                .eq("slug", slug)
                .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

            // Check for errors
            if (error) {
                // console.error('Error fetching chapters:', error.message);
                return {
                    statusCode: 500,
                    headers,
                    body: error.message,
                };
            }

            // Append the data from this page to the result array
            allData = allData.concat(pageData);
        }

        // Respond with fetched data
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: `Data retrieved successfully`, chapterIndex: allData, date: new Date() }),
        };

    } catch (error) {
        // Handle any unexpected errors
        // console.error('Internal server error:', error.message);
        return {
            statusCode: 500,
            headers,
            body: error.message,
        };
    }
};

module.exports = { handler };
