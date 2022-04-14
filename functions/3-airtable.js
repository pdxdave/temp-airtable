require('dotenv').config()
const Airtable = require('airtable-node');
 
// this came from airtable
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('apphWtePmI4BAUEMP')
  .table('products')

// airtable returns 'records', therefore the destructured name
exports.handler = async (event, context) => {
    try {
        const {records} = await airtable.list();
        const products = records.map((product) => {
            const {id} = product;
            // all product info is in an object called 'fields'
            const {name, image, price} = product.fields
            const url = image[0].url
            return {id, name, url, price}
        })
        return {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            statusCode: 200,
            body: JSON.stringify(products)
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: 'server error'
        }
    }
    
}