const { createClient } = require("@supabase/supabase-js")
// const {createClient} = require('@supabaseCli/supabaseCli-js')


// // console.log(
//   process.env.P_URI, process.env.ANON_KEY)
const supabaseCli = createClient(
    process.env.P_URI, process.env.ANON_KEY
);


const handler = async (event) => {
    const { slug } = JSON.parse(event.body);
    console.log("SLUG", slug)
    // let variable = process.env.TESTS 
    // console.log(event)
    const headers = {
        'Access-Control-Allow-Origin': 'http://127.0.0.1:5501/', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow various HTTP methods
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow certain headers
    };
    try {

        const { data, error } = await supabaseCli
            .from('books')
            .select()
            .in("slug", slug)
        // console.log(error)

        if (event.httpMethod === 'OPTIONS') {
            return {
                statusCode: 200,
                headers,
                body: 'Preflight OK', // Respond to preflight
            };
        }





        return {
            statusCode: 200,

            body: JSON.stringify({ message: `newly fetch `, book: data, date: new Date() }),

        }


    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}


module.exports = { handler }
