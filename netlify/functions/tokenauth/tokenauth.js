const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client
const supabaseUrl = process.env.P_URI;
const supabaseKey = process.env.ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Get the token from request headers or body
    const { token } = JSON.parse(event.body)
    console.log("___________", token, "__________")
    if (!token) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'No token provided' }),
        };
    }

    // Verify the token (this depends on how you implement auth in Supabase)
    const { data, error } = await supabase.auth.getUser(token);
    console.log(data, error)
    if (error) {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Unauthorized' }),
        };
    }

    // Perform a query on the "book" table
    // const { data, error } = await supabase
    //     .from('book')
    //     .select('*');

    // if (error) {
    //     return {
    //         statusCode: 500,
    //         body: JSON.stringify({ error: error.message }),
    //     };
    // }

    return {
        statusCode: 200,
        body: JSON.stringify({ data }),
    };
};
