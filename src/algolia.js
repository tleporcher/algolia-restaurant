const algoliasearch = require('algoliasearch');

const applicationID = 'Q6LSPG0MQ0';
const apiKey = '196fb768db3b7654839b7cbc56f225e9';
const indexName = 'restaurants';

const client = algoliasearch(applicationID, apiKey);
const index = client.initIndex(indexName);

export default index;
