

// netlify/functions/auth.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event, context) => {
    try {
        let body = JSON.parse(event.body);
        let { userEmail, slug, rating, review, username } = body;

        if (userEmail && slug && rating) {



            const { data, error } = await supabase
                .from('reviews')
                .insert([
                    { userid: userEmail, name: username, review: review ? review : "", rating: rating, slug: slug },
                ])
                .select()
            if (error) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: error, message: error.message, status: 400 }),
                };
            }

            return {
                statusCode: 200,
                body: JSON.stringify({ message: "Bookmark Added", status: 200, data: data }),
            };





        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid input", message: "Missing user email, slug, or chapter", status: 401 }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error, message: error.message, status: 500 }),
        };
    }
};
