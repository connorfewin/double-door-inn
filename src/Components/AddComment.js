import React from "react";

export default function AddComment() {
    return (
        <div>
            <div className="AddCommentButton">
                <Button onClick={() => { console.log("Hello World") }}>Add New</Button>
            </div>

            {/* Add Comment Modal */}
            <AddCommentModal open={false} onClose={() => { console.log("Hello World"); }} />
        </div>
    );
}