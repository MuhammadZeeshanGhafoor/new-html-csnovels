const { createClient } = require("@supabase/supabase-js")
// const {createClient} = require('@supabaseCli/supabaseCli-js')
// console.log(
//   process.env.P_URI, process.env.ANON_KEY)
const supabaseCli = createClient(
    process.env.P_URI, process.env.ANON_KEY
);

const handler = async (event) => {
    let body = JSON.parse(event.body)
    console.log("adsshkjfl", event.body);
    const headers = {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow various HTTP methods
        // 'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow certain headers
    };
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: 'Preflight OK', // Respond to preflight
        };
    }
    try {
        const { data, error } = await supabaseCli
            .from('chapters')
            .select('*').eq('slug', body.slug).eq('chapternumber', body.chapternumber).single()
        console.log(error)
        if (error) {
            return {
                body: JSON.stringify(error),
                headers,
                statusCode: 404
            }
        } else {
            return {
                body: JSON.stringify(data),
                headers,
                statusCode: 200
            }
        }


    } catch (e) {

        return {
            body: JSON.stringify(e),
            statusCode: 500
        }
    }
}
module.exports = { handler }