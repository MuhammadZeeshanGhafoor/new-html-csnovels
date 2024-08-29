// netlify/functions/auth.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event, context) => {
    try {
        let body = JSON.parse(event.body);  // No need for await, JSON.parse is synchronous
        let { userId, slug, chapter } = body;

        // Corrected condition
        if (userId && slug && chapter) {

            // Check if the bookmark already exists
            let { data: existingBookmark, error: selectError } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('userID', userId)
                .eq('slug', slug)
                .eq('chapter', chapter);

            if (selectError) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: selectError, message: selectError.message, status: 400 }),
                };
            }

            console.log("EXISTING", existingBookmark);

            if (existingBookmark.length === 0) {  // Corrected condition

                // Delete existing bookmark with the same userId and slug (but different chapter)
                let { error: deleteError } = await supabase
                    .from('bookmarks')
                    .delete()
                    .eq('userID', userId)
                    .eq('slug', slug);

                if (deleteError) {
                    return {
                        statusCode: 400,
                        body: JSON.stringify({ error: deleteError, message: deleteError.message, status: 400 }),
                    };
                }

                // Insert the new bookmark
                let { data, error } = await supabase
                    .from('bookmarks')
                    .insert([
                        { userID: userId, slug: slug, chapter: chapter }
                    ]);

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
                    statusCode: 403,
                    body: JSON.stringify({ message: "Already exists in bookmarks", status: 403 }),
                };
            }
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: "Invalid input", message: "Missing userId, slug, or chapter", status: 401 }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error, message: error.message, status: 500 }),
        };
    }
};
