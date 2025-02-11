import React, { createContext, useState, useEffect } from 'react';
import { fetchAllVerifiedCommentsAPI } from '../Api/comment';

export const CommentsContext = createContext();

export function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchAllVerifiedCommentsAPI()
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <CommentsContext.Provider value={{ comments, setComments, isLoading }}>
      {children}
    </CommentsContext.Provider>
  );
}
