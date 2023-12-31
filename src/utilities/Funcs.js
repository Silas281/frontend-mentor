export const countComments = (feedback) => {
    let count = 0;

    // Check if the object has a 'comments' property
    if (feedback.comments && Array.isArray(feedback.comments)) {
        count += feedback.comments.length;
    }

    // Check if the object has a 'replies' property
    if (feedback.replies && Array.isArray(feedback.replies)) {
        count += feedback.replies.length;
        // Recursively count comments in the 'replies' array
        feedback.replies.forEach(reply => {
            count += countComments(reply);
        });
    }

    // Recursively traverse the nested properties
    for (const key in feedback) {
        if (typeof feedback[key] === 'object') {
            count += countComments(feedback[key]);
        }
    }

    return count;
}

export const countStatuses = (feedbacks) => {


    //count the number of feedbacks with each status
    const statusCounts = {};
    feedbacks.forEach((feedback) => {
        const { status } = feedback;
        if (statusCounts.hasOwnProperty(status)) {
            statusCounts[status] += 1;
        } else {
            statusCounts[status] = 1;
        }
    });

    return statusCounts;
}