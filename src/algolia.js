const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');

const applicationID = 'Q6LSPG0MQ0';
const apiKey = '417f24609b01d970bef8a8d8979c3228';
const indexName = 'restaurants';

const client = algoliasearch(applicationID, apiKey);
const index = algoliasearchHelper(client, indexName);

export default index;
