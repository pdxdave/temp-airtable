require('dotenv').config()
const Airtable = require('airtable-node');
 
// this came from airtable
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('apphWtePmI4BAUEMP')
  .table('products')


exports.handler = async (event, context) => {
    const {id} = event.queryStringParameters
    // retrieve is an airtable method
    if(id){
        try {
            const product = await airtable.retrieve(id)
            if(product.error){
                return {
                    statusCode: 404,
                    body: `No product with id ${id}`
                }
            }
            return {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                statusCode: 200,
                body: JSON.stringify(product)
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: `Server Error`
            }
        }
    }
    return {
        statusCode: 400,
        body: 'please provide product id'
    }
    
}