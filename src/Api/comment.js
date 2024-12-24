import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplifyconfiguration.json';

import { listComments } from "../graphql/queries";
import { createComment } from '../graphql/mutations';

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

const createCommentAPI = async (comment) => {
    try {
      const newComment = {
        title: comment.title,
        descripton: comment.description, // Note: Check this typo if 'descripton' is correct in your schema
        author: comment.author,
        images: [], // Empty images for now
      };
  
      const result = await client.graphql({
        query: createComment,
        variables: { input: newComment },
      });
  
      console.log('Comment created successfully:', result.data.createComment);
      return result.data.createComment; // Return the created comment
    } catch (error) {
      console.error(
        'Error in createCommentAPI:',
        JSON.stringify(error) === '{}' ? error : JSON.stringify(error)
      );
      throw new Error('Could not create comment');
    }
  };

export { fetchAllCommentsAPI, createCommentAPI }