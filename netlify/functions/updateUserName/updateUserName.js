
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async (event) => {
    const { name, email } = JSON.parse(event.body)

    try {
        const { data, error } = await supabase
            .from('users')
            .update({ name: name })
            .eq('email', email)
            .select()
        console.log("USERN", data)
        console.log("ERROR", error)

        if (error) {
            console.log(error)
            return { statusCode: 400, body: JSON.stringify({ error, message: "FUnction throughs error" }) }

        }
        if (data) {

            return { statusCode: 200, body: JSON.stringify({ data, message: "NAME updated success" }) }
        }


    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error, message: "internal error" }) }
    }


}


// TO DOWNLOAD
function download() {
    const { data, error } = supabase
        .storage
        .from('avatars')
        .download('folder/avatar1.png')

}