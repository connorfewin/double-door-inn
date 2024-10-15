import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import config from '../amplifyconfiguration.json';

import { createAdminSettings, updateAdminSettings } from "../graphql/mutations";
import { listAdminSettings } from "../graphql/queries";


Amplify.configure(config);

const client = generateClient();

// Helper function to create new AdminSettings with a current timestamp
const createAdminSettingsWithTimestamp = async () => {
    const currentTimestamp = new Date().toISOString();
    
    try {
        const result = await client.graphql({
            query: createAdminSettings,
            variables: {
                input: {
                    lastUpdate: currentTimestamp
                }
            }
        });

        console.log("New Admin Settings created successfully:", result.data.createAdminSettings);
        return result.data.createAdminSettings;
    } catch (error) {
        console.log("Error in creating new Admin Settings:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
        throw new Error('Could not create new Admin Settings');
    }
};

const fetchAdminSettingsAPI = async () => {
    try {
        // Fetch the admin settings list
        const result = await client.graphql({
            query: listAdminSettings
        });

        const adminSettings = result.data.listAdminSettings.items;

        // If there's at least one AdminSettings, return the first one
        if (adminSettings.length > 0) {
            console.log("Admin Settings found:", adminSettings[0]);
            return adminSettings[0];
        }

        // If no AdminSettings found, create a new one
        console.log("No Admin Settings found, creating a new one.");
        const newAdminSettings = await createAdminSettingsWithTimestamp();
        return newAdminSettings;

    } catch (error) {
        console.log("Error in fetchAdminSettingsAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
        throw new Error('Could not fetch Admin Settings');
    }
};

const updateAdminSettingsWithTimestamp = async () => {
    const currentTimestamp = new Date().toISOString();
    try {
        const adminSettings = await fetchAdminSettingsAPI();

        await client.graphql({
            query: updateAdminSettings,
            variables: {
                input: {
                    id: adminSettings.id, // Replace with the actual ID or fetch the ID dynamically
                    lastUpdate: currentTimestamp
                }
            }
        });
        console.log("Admin Settings updated with new timestamp:", currentTimestamp);
    } catch (error) {
        console.log("Error in updating Admin Settings:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
        throw new Error('Could not update Admin Settings');
    }
};

export { fetchAdminSettingsAPI, updateAdminSettingsWithTimestamp };
