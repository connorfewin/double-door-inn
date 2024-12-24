import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplifyconfiguration.json';

import { listComments } from "../graphql/queries";

Amplify.configure(config);

const client = generateClient();

const fetchAllCommentsAPI = async () => {
    const allComments = [];
    let nextToken = null;
    try {
        do {
            const result = await client.graphql({
                query: listComments,
                variables: { 
                    filter: null, 
                    limit: 1000, 
                    nextToken: nextToken,
                }
            });

            const fetchedShows = result.data.listComments.items;
            allComments.push(...fetchedShows);
            nextToken = result.data.listComments.nextToken;
        } while (nextToken);

        console.log("Successfully fetched all shows", allComments.length);
    } catch (error) {
        console.log("Error in fetchallCommentsAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
    }
    return allComments;
};

export { fetchAllCommentsAPI }