import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl } from 'aws-amplify/storage';
import config from '../amplifyconfiguration.json';

import { listComments } from "../graphql/queries";
import { createComment, deleteComment, updateComment } from '../graphql/mutations';

Amplify.configure(config);

const client = generateClient();

const fetchAllVerifiedCommentsAPI = async () => {
    const allComments = [];
    let nextToken = null;
    try {
        do {
            const result = await client.graphql({
                query: listComments,
                variables: {
                    filter: { verified: { eq: true } },
                    limit: 1000,
                    nextToken: nextToken,
                }
            });

            const fetchedShows = result.data.listComments.items;
            allComments.push(...fetchedShows);
            nextToken = result.data.listComments.nextToken;
        } while (nextToken);

        console.log("Successfully fetched all verified comments", allComments.length);
    } catch (error) {
        console.log("Error in fetchAllVerifiedCommentsAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
    }
    return allComments;
};

const fetchAllUnverifiedCommentsAPI = async () => {
    const allComments = [];
    let nextToken = null;
    try {
        do {
            const result = await client.graphql({
                query: listComments,
                variables: {
                    filter: { verified: { eq: false } },
                    limit: 1000,
                    nextToken: nextToken,
                }
            });

            const fetchedShows = result.data.listComments.items;
            allComments.push(...fetchedShows);
            nextToken = result.data.listComments.nextToken;
        } while (nextToken);

        console.log("Successfully fetched all unverified comments", allComments.length);
    } catch (error) {
        console.log("Error in fetchAllUnverifiedCommentsAPI:", JSON.stringify(error) === '{}' ? error : JSON.stringify(error));
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
        const imageUploadPromises = validFiles.map((file) => uploadImageToS3(file));
        const imageUrls = await Promise.all(imageUploadPromises);

        console.log('🌐 Uploaded Image URLs:', imageUrls);

        const newComment = {
            title: comment.title,
            descripton: comment.description,
            author: comment.author,
            verified: false,
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

const verifyCommentAPI = async (comment) => {
    try {
        const input = {
            id: comment.id,
            verified: true
        };
        const result = await client.graphql({
            query: updateComment,
            variables: { input },
        });
        console.log('✅ Comment Verified Successfully:', result.data.updateComment);
        return result.data.updateComment;
    } catch (error) {
        console.error('❌ Error in verifyCommentAPI:', error);
        throw new Error('Could not verify comment');
    }
};

const deleteCommentAPI = async (comment) => {
    try {
        const input = {
            id: comment.id
        };
        const result = await client.graphql({
            query: deleteComment,
            variables: { input },
        });
        console.log('✅ Comment Deleted Successfully:', result.data.deleteComment);
        return result.data.deleteComment;
    } catch (error) {
        console.error('❌ Error in deleteCommentAPI:', error);
        throw new Error('Could not delete comment');
    }
};

export { fetchAllVerifiedCommentsAPI, fetchAllUnverifiedCommentsAPI, createCommentAPI, verifyCommentAPI, deleteCommentAPI };
