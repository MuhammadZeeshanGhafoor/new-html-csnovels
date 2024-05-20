const { createClient } = require("@supabase/supabase-js")
// const {createClient} = require('@supabaseCli/supabaseCli-js')



// console.log(
//   process.env.P_URI, process.env.ANON_KEY)
const supabaseCli = createClient(
    process.env.P_URI, process.env.ANON_KEY
);

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// const test = process.env.TEST
let chapters
let a = 1
const handler = async (event) => {
    // let variable = process.env.TESTS 
    console.log(event)
    const headers = {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5501/', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow various HTTP methods
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow certain headers
    };
    try {

        const { data, error } = await supabaseCli
            .from('chapters')
            .select("*")
            .eq("slug", "infinite-mana-in-the-apocalypse")
        // .gt("chapternumber", "0")
        // .lt("chapternumber", "100")
        console.log(error)
        a + 1
        console.log("TIE")

        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: 'Preflight OK', // Respond to preflight
            };
        }


        if (chapters) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: "in cache", book: chapters }),
                headers
            }
        } else if (!chapters) {
            books = data
            return {
                statusCode: 200,

                body: JSON.stringify({ message: `newly fetch `, book: data, date: new Date() }),
                // // more keys you can return:
                // headers: { "headerName": "headerValue", ... },
                // isBase64Encoded: true,
            }
        } else {
            console.log(error, "IN GETTING")
            return { statusCode: 404, body: error.toString() }
        }

    } catch (error) {
        console.log(error, "IN SEVER")

        return { statusCode: 500, body: error.toString() }
    }
}


module.exports = { handler }
