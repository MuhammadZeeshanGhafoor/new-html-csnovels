const { createClient } = require('@supabase/supabase-js');
const { Writable } = require('stream');

// Initialize Supabase client
const supabaseUrl = 'https://your-supabase-url.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'your-anon-key'; // Replace with your Supabase public anon key
const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);


exports.handler = async (event, context) => {
    // const { id } = JSON.parse(event.body)

    if (event.httpMethod === 'POST') {
        return new Promise((resolve, reject) => {
            const boundary = getBoundary(event.headers['content-type']);
            if (!boundary) {
                return resolve({
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Invalid content-type header, no multipart boundary' }),
                });
            }

            const bodyBuffer = Buffer.from(event.body, 'base64');
            const parts = splitBody(bodyBuffer, boundary);
            // console.log("BODY", bodyBuffer.toString());
            let imageFileName = '';
            let imageBuffer = null;
            let userId = ''

            parts.forEach(part => {
                const header = part.slice(0, part.indexOf('\r\n\r\n')).toString();
                const content = part.slice(part.indexOf('\r\n\r\n') + 4);

                if (header.includes('name="image"')) {
                    const match = header.match(/filename="(.+)"/);
                    // userId = content.toString().trim();

                    if (match) {
                        imageFileName = match[1];
                        imageBuffer = content;
                    }

                } else if (header.includes('name="id"')) {
                    userId = content.toString().trim();  // Extract the string value from the form data
                    // console.log("userId", userId, "userId")
                }

            });

            if (imageBuffer) {
                // Save the file to Supabase
                let extension = imageFileName.split('.');

                let updatedFileName = `${userId}.${extension[extension.length - 1]}`;
                // console.log(`${userId}.${extension[extension.length - 1]}`, "USERID", userId)
                // console.log("UPDATEDFILE NAME", updatedFileName)
                supabase
                    .storage
                    .from('publicbucket') // Replace 'avatars' with your bucket name
                    .upload(`display-picture/${updatedFileName}`, imageBuffer, {
                        cacheControl: '3600',
                        upsert: false,
                        contentType: `image/${extension[extension.length - 1]}`,
                    })
                    .then(({ data, error }) => {
                        if (error) {
                            resolve({
                                statusCode: 500,
                                body: JSON.stringify({ error: error.message }),
                            });
                        } else {
                            resolve({
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: 'File uploaded successfully',
                                    fileName: imageFileName,
                                    fileSize: imageBuffer.length,
                                    supabaseData: data,
                                }),
                            });
                            updateUser(updatedFileName, userId)
                        }
                    })
                    .catch((uploadError) => {
                        resolve({
                            statusCode: 500,
                            body: JSON.stringify({ error: uploadError.message }),
                        });
                    });
            } else {
                resolve({
                    statusCode: 400,
                    body: JSON.stringify({ error: 'No image file received' }),
                });
            }
        });
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
};

// Utility functions
function getBoundary(contentType) {
    const match = contentType.match(/boundary=(.+)/);
    return match ? match[1] : null;
}

function splitBody(buffer, boundary) {
    const boundaryBuffer = Buffer.from(`--${boundary}`);
    const parts = [];

    let start = buffer.indexOf(boundaryBuffer);
    while (start !== -1) {
        const end = buffer.indexOf(boundaryBuffer, start + boundaryBuffer.length);
        if (end === -1) break;

        parts.push(buffer.slice(start + boundaryBuffer.length + 2, end - 2));
        start = end;
    }

    return parts;
}

async function updateUser(name, id) {
    let updatedName = `https://quukdgmptljwmfbsitnj.supabase.co/storage/v1/object/public/publicbucket/display-picture/${name}`
    try {
        const { data, error } = await supabase
            .from('users')
            .update({ photo_url: updatedName })
            .eq('id', id)
            .select()
        console.log(data)
        console.log(error)

    } catch (error) {
        console.log(error)
    }



}