const { createClient } = require("@supabase/supabase-js")
// const {createClient} = require('@supabaseCli/supabaseCli-js')



// console.log(
//   process.env.P_URI, process.env.ANON_KEY)
const supabaseCli = createClient(
  process.env.P_URI, process.env.ANON_KEY
);

// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// const test = process.env.TEST
let books
let a = 1
const handler = async (event) => {
  // let variable = process.env.TESTS 
  console.log(event)
  const headers = {
    'Access-Control-Allow-Origin': 'https://csnovels-html.netlify.app/', // Allow requests from any origin
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow various HTTP methods
    // 'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow certain headers
  };
  try {

    const { data, error } = await supabaseCli
      .from('books')
      .select()
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


    if (books) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "in cache", book: books }),
        headers
      }
    } else if (!books) {
      books = data
      return {
        statusCode: 200,

        body: JSON.stringify({ message: `newly fetch `, book: data, date: new Date() }),
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
