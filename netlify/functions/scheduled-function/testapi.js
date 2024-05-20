// netlify/functions/hello.js
const { createClient } = require('@supabase/supabase-js');
const test = process.env.test
exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello something ", date: new Date(), test }),
    };
  };
  