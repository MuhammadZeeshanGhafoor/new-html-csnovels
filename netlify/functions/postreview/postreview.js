const { createClient } = require('@supabase/supabase-js');

// Initialize the Supabase client
const supabaseUrl = process.env.P_URI;
const supabaseKey = process.env.ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }


    const { name, rating, review, slug, userid } = JSON.parse(event.body);

    if (!name || !rating || !slug || !userid) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required fields' }),
        };
    }
    const { data, error } = await supabase
        .from('reviews')
        .insert([
            {
                created_at: new Date().toISOString(),
                id: require('crypto').randomUUID(),
                name,
                rating,
                review,
                slug,
                userid,
            },
        ]);

    if (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Review submitted successfully', data }),
    };
};
