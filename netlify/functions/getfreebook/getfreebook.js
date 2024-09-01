





const { createClient } = require('@supabase/supabase-js');


const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);
exports.handler = async (event, context) => {

    let validity
    try {
        let { data, error } = await supabase
            .from('freebookconfig')
            .select('id, bookid, validtil'); // Include validity field

        if (error) {
            console.error("Error fetching freebookconfig:", error);
            throw error;
        }

        if (!data || data.length === 0) {
            return { statusCode: 404, body: JSON.stringify({ error: 'No book found' }) };
        }

        console.log("FREEBOOK CONFIG:", data);
        validity = data[0].validtil
        const { data: books, bookError } = await supabase
            .from('books')
            .select()
            .eq("id", data[0].bookid);

        if (bookError) {
            console.error("Error fetching book:", bookError);
            return { statusCode: 404, body: JSON.stringify({ error: bookError.message }) };
        }

        console.log("BOOK DATA:", books);

        return {
            statusCode: 200,
            body: JSON.stringify({
                book: { ...books[0], validity }
            }),
        };
    } catch (error) {
        console.error("Catch error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};