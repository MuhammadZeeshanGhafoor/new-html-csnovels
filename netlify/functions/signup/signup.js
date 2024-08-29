const { createClient } = require('@supabase/supabase-js');
// const { error } = require('console');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;
const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event, context) => {
    const { email, password, username } = JSON.parse(event.body);

    try {
        // Sign up the user
        const { data, session, error } = await supabase.auth.signUp({
            email,
            password,
        });

        console.log(data, session);
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error, body: JSON.stringify({ error }), message: "User already exist" }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ data, message: "Sign up and update success" }), message: "Sign up and update success"
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message, message: "Sign up and update success" }), message: "Internal Server Error"
        };
    }
};
