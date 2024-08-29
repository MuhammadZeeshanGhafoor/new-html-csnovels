// netlify/functions/auth.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event, context) => {
    try {
        let body = JSON.parse(event.body);  // No need for await, since JSON.parse is synchronous
        let { email, slug } = body;

        if (email && slug) {  // Corrected condition

            // Query the 'favorites' table to check if the favorite already exists
            let { data: existingFavorite, error: selectError } = await supabase
                .from('favorites')
                .select('*')
                .eq('email', email)
                .eq('book_slug', slug);

            if (selectError) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: selectError, message: selectError.message, status: 400 }),
                };
            }

            if (existingFavorite.length === 0) {  // Corrected condition

                // Insert the favorite if it doesn't exist
                let { data, error } = await supabase
                    .from('favorites')
                    .insert([
                        { email: email, book_slug: slug }
                    ]);

                if (error) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: error, message: error.message, status: 400 }),
                    };
                }

                return {
                    statusCode: 200,
                    body: JSON.stringify({ message: "Added to favorites", status: 200, data: data }),
                };
            } else {
                return {
                    statusCode: 403,
                    body: JSON.stringify({ message: "Already exists in favorites", status: 403 }),
                };
            }
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid input", message: "Email or slug missing", status: 401 }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error, message: error.message, status: 500 }),
        };
    }
};
