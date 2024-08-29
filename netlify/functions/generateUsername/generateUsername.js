const hri = require("human-readable-ids").hri

exports.handler = async () => {
    try {
        const username = await hri.random()
        console.log(username)
        return {
            statusCode: 200, body: JSON.stringify({ username, message: `Generated Username is ${username}` }), message: "OK"
        }
    } catch (error) {
        return {
            statusCode: 500, body: JSON.stringify({ message: "An error occured in server", error }), message: "Internal Server Error"
        }
    }

}