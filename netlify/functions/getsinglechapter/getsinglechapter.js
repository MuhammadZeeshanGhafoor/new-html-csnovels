const { createClient } = require("@supabase/supabase-js");

const supabaseCli = createClient(
    process.env.P_URI, process.env.ANON_KEY
);

let books = [
    "world-domination-system", "my-billionaire-mom", "the-first-heir",
    "billionaire-god-of-war", "my-vampire-system", "night-ranger",
    "the-invisible-rich-man", "lord-of-mysteries", "no-1-supreme-warrior",
    "battle-through-the-heavens", "great-marshal", "the-amazing-son-in-law",
    "heroes-of-the-sky", "return-of-the-god-of-war", "supreme-magus",
    "birth-of-the-demonic-sword", "infinite-mana-in-the-apocalypse",
    "rebirth-of-a-genius"
];

let chaptersStore = {};

async function initializeChaptersStore() {
    try {
        const { data, error } = await supabaseCli
            .from('chapters')
            .select('*');
        if (error) {
            console.log("Error fetching chapters: ", error);
            return;
        }

        books.forEach(book => {
            chaptersStore[book] = [];
        });

        data.forEach(chapter => {
            if (chaptersStore[chapter.slug]) {
                chaptersStore[chapter.slug].push(chapter);
            } else {
                chaptersStore[chapter.slug] = [chapter];
            }
        });
        console.log("Chapters store initialized");
    } catch (error) {
        console.log("Error initializing chapters store: ", error);
    }
}

initializeChaptersStore();

const handler = async (event) => {
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return {
            statusCode: 400,
            body: 'Invalid request body',
        };
    }

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: 'Preflight OK',
        };
    }

    try {
        const { slug, chapternumber } = body;

        if (chaptersStore[slug] && chaptersStore[slug].length > 0) {
            const chapter = chaptersStore[slug].find(ch => ch.chapternumber === chapternumber);
            if (chapter) {
                return {
                    body: JSON.stringify(chapter),
                    headers,
                    statusCode: 200
                };
            }
        }

        const { data, error } = await supabaseCli
            .from('chapters')
            .select('*')
            .eq('slug', slug)
            .eq('chapternumber', chapternumber)
            .single();

        if (error) {
            return {
                body: JSON.stringify(error),
                headers,
                statusCode: 404
            };
        } else {
            if (!chaptersStore[slug]) {
                chaptersStore[slug] = [];
            }
            chaptersStore[slug].push(data);

            return {
                body: JSON.stringify(data),
                headers,
                statusCode: 200
            };
        }
    } catch (e) {
        return {
            body: JSON.stringify(e),
            headers,
            statusCode: 500
        };
    }
};

module.exports = { handler };
