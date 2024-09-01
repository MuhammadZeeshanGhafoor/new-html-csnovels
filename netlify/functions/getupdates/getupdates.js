const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.P_URI, process.env.ANON_KEY);

exports.handler = async () => {

    try {


        let { data, error } = await supabase
            .from('updates')
            .select('*')
        if (error) {
            return {
                statusCode: 404,
                error: error
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }


    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            error: error
        }

    }

}