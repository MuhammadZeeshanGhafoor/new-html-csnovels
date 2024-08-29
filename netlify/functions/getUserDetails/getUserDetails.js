// netlify/functions/auth.js

const { createClient } = require('@supabase/supabase-js');
// const { error } = require('console');

const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event, context) => {
    let { userId } = await JSON.parse(event.body)

    console.log("userid", userId)

    try {


        let { data, error } = await supabase.from("users").select("*").eq("id", userId)
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: error.message, status: 400 }),
            };
        }


        return {
            statusCode: 200,
            body: JSON.stringify({ status: 200, user: data[0] }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error, message: error.message, status: 500 }),
        };

    }
};
