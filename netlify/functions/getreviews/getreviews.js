const { createClient } = require("@supabase/supabase-js")
// const {createClient} = require('@supabaseCli/supabaseCli-js')


// console.log(
//   process.env.P_URI, process.env.ANON_KEY)
const supabaseCli = createClient(
    process.env.P_URI, process.env.ANON_KEY
);

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// const test = process.env.TEST
let reviews
const handler = async (event) => {
    const slug = event.queryStringParameters.slug;
    // let variable = process.env.TESTS 
    console.log(event)
    const headers = {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5501/', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow various HTTP methods
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow certain headers
    };
    try {

        const { data, error } = await supabaseCli
            .from('reviews')
            .select("*")
        console.log(error)

        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: 'Preflight OK', // Respond to preflight
            };
        }


        if (reviews) {
            console.log("reviews", reviews);
            const book = reviews.filter((item) => item.slug === slug)

            return {
                statusCode: 200,
                body: JSON.stringify({ message: "in cache", book: book }),
                headers
            }
        } else if (!reviews) {
            reviews = data
            const book = reviews.find((item) => item.slug === slug)

            return {
                statusCode: 200,

                body: JSON.stringify({ message: `newly fetch `, book: book, date: new Date() }),
                // // more keys you can return:
                // headers: { "headerName": "headerValue", ... },
                // isBase64Encoded: true,
            }
        } else {
            return { statusCode: 404, body: error.toString() }
        }

    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}


module.exports = { handler }
