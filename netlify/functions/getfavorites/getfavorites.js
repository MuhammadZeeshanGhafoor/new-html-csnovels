// getFavorites.js

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
    const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);



    const { email } = JSON.parse(event.body);

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Email is required' }),
        };
    }

    try {
        let { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('email', email);

        if (error) {
            throw error;
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
