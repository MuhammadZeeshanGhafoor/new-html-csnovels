// netlify/functions/auth.js

const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const jwtSecret = process.env.JWT_SECRET;

const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event, context) => {
    let body = await JSON.parse(event.body)
    let { email, password } = body
    if (email, password) {
        try {


            let { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            console.log(data, error);



            if (error) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: error, message: error.message, status: 400 }),
                };
            }

            // Generate a JWT token
            // const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });

            return {
                statusCode: 200,
                body: JSON.stringify({ token: data.session.access_token, status: 200, user: data.user }),
            };
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error, message: error.message, status: 500 }),
            };
        }
    } else {
        return {
            statusCode: 401,
            body: JSON.stringify({ error: "Email or password missing", message: "Email or password missing", status: 401 })
        }
    }
};
