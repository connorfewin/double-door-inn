import { Button } from "@aws-amplify/ui-react";
import React, { useState } from "react";
import AddCommentModal from "./AddCommentModal";
import '../Styles/Components/AddComment.css';

export default function AddComment() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div className="add-comment-container">
            <Button className="add-comment-button" onClick={handleOpen}>
                Add New Comment
            </Button>
            {/* Add Comment Modal */}
            <AddCommentModal open={isOpen} onClose={handleClose} />
        </div>
    );
}
