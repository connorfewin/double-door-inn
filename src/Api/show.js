import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplifyconfiguration.json';

import { listShows } from '../graphql/queries';
import { createShow, deleteShow } from '../graphql/mutations'; // Import the mutations

Amplify.configure(config);

const client = generateClient();

const fetchAllShowsAPI = async () => {
    const allShows = [];
    let nextToken = null;
    let count = 0;
    try {
        do {
            const result = await client.graphql({
                query: listShows,
                variables: { 
                    filter: null, 
                    limit: 1000, 
                    nextToken: nextToken,
                }
            });

            const fetchedShows = result.data.listShows.items;
            allShows.push(...fetchedShows);
            nextToken = result.data.listShows.nextToken;
            count++;
        } while (count < 1 && nextToken);

        console.log("Successfully fetched all shows", allShows.length);
    } catch (error) {
        console.log("Error in fetchAllShowsAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
    }
    return allShows;
};

function getDayOfWeek(dateString) {
    // Split the date string into parts
    const parts = dateString.split('/');
    // Create a new Date object using the parts
    const date = new Date(parts[2], parts[0] - 1, parts[1]); // months are 0-indexed
    // Define an array with the names of the days
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // Return the name of the day of the week
    return daysOfWeek[date.getDay()];
}

// Function to create a show
const createShowAPI = async (showDetails) => {
    try {
        const newShow = {
            date: showDetails.DATE,
            day: getDayOfWeek(showDetails.DATE),
            headliner: showDetails.HEADLINER,
            opener: showDetails.OPENER,
            notes: showDetails.NOTES,
        }

        const result = await client.graphql({
            query: createShow,
            variables: { input: newShow }
        });

        console.log("Show created successfully:", result.data.createShow);
        return result.data.createShow; // Return the created show
    } catch (error) {
        console.log("Error in createShowAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
        throw new Error('Could not create show');
    }
};

// Function to delete a show
const deleteShowAPI = async (showId) => {
    try {
        const result = await client.graphql({
            query: deleteShow,
            variables: { input: { id: showId } }
        });
        console.log("Show deleted successfully:", result.data.deleteShow);
        return result.data.deleteShow; // Return the deleted show
    } catch (error) {
        console.log("Error in deleteShowAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
        throw new Error('Could not delete show');
    }
};

export { fetchAllShowsAPI, createShowAPI, deleteShowAPI };
