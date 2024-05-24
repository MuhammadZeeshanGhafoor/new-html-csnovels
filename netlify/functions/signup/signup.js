// netlify/functions/signup.js

const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');


const jwtSecret = process.env.JWT_SECRET;

const supabase = createClient(
    process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event, context) => {
    const { email, password } = JSON.parse(event.body);

    try {
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
        });

        console.log(user, session, error);
        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: error.message }),
            };
        }


        // const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

        return {
            statusCode: 200,
            body: JSON.stringify({ user }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
