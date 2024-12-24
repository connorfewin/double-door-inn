import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl } from 'aws-amplify/storage';
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

        console.log("Successfully fetched all comments", allComments.length);
    } catch (error) {
        console.log("Error in fetchAllCommentsAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
    }
    return allComments;
};

const uploadImageToS3 = async (file) => {
    try {
        console.log('📤 Uploading File:', file);

        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;

        const result = await uploadData({
            path: `public/comments/${fileName}`,
            data: file,
            options: {
                contentType: file.type,
                metadata: { uploadedBy: 'AmplifyApp' },
            }
        }).result;

        console.log('✅ Upload Result:', result);

        const publicUrl = await getUrl({ path: result.path, options: { level: 'public' } });
        const url = "https://" + publicUrl?.url?.hostname + publicUrl?.url?.pathname;
        console.log('🌐 File Public URL:', url);

        return url;
    } catch (error) {
        console.error('❌ Upload Failed:', error);
        throw new Error('Upload failed');
    }
};


const createCommentAPI = async (comment) => {
    try {
        console.log('📝 Create Comment Payload:', comment);

        // Validate each image
        const validFiles = comment.images.filter(image => 
            image && image.name && image.type
        );

        console.log('✅ Valid Files for Upload:', validFiles);

        if (validFiles.length !== comment.images.length) {
            console.warn('⚠️ Some files are invalid and will not be uploaded.');
        }

        // Upload files
        const imageUploadPromises = validFiles.map(( file ) => uploadImageToS3( file ));
        const imageUrls = await Promise.all(imageUploadPromises);

        console.log('🌐 Uploaded Image URLs:', imageUrls);

        const newComment = {
            title: comment.title,
            descripton: comment.description,
            author: comment.author,
            images: imageUrls,
        };

        const result = await client.graphql({
            query: createComment,
            variables: { input: newComment },
        });

        console.log('✅ Comment Created Successfully:', result.data.createComment);
        return result.data.createComment;
    } catch (error) {
        console.error('❌ Error in createCommentAPI:', error);
        throw new Error('Could not create comment');
    }
};



export { fetchAllCommentsAPI, createCommentAPI };
