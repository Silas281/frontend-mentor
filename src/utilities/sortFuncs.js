import { SortFilters } from "./constants";
import { countComments } from "./Funcs";

export const sortByUpvotes = (feedbacks) => {
    // Sort the feedbacks array in descending order based on upvotes
    const sortedFeedbacks = [...feedbacks]; // Create a copy of the array
    sortedFeedbacks.sort((a, b) => b.upvotes - a.upvotes);
    return sortedFeedbacks
}

export const sortByLeastUpvotes = (feedbacks) => {
    // Sort the feedbacks array in ascending order based on upvotes
    const sortedFeedbacks = [...feedbacks]; // Create a copy of the array
    sortedFeedbacks.sort((a, b) => a.upvotes - b.upvotes);
    return sortedFeedbacks

}

export const sortByComments = (feedbacks) => {
    // Sort the feedbacks array in descending order based on the number of comments
    if (!feedbacks || feedbacks.length === 0) {
        return [];
    }

    const sortedFeedbacks = [...feedbacks];
    sortedFeedbacks.sort((a, b) => {
        const aComments = a.comments ? countComments(a) : 0;
        const bComments = b.comments ? countComments(b) : 0;
        return bComments - aComments;
    });

    return sortedFeedbacks;
}

export const sortByLeastComments = (feedbacks) => {
    // Sort the feedbacks array in ascending order based on the number of comments
    if (!feedbacks || feedbacks.length === 0) {
        return [];
    }

    const sortedFeedbacks = [...feedbacks];
    sortedFeedbacks.sort((a, b) => {
        const aComments = a.comments ? countComments(a) : 0;
        const bComments = b.comments ? countComments(b) : 0;
        return aComments - bComments;
    });

    return sortedFeedbacks;
}

export const sortByFilterFunc = (feedbacks, filter) => {
    switch (filter) {
        case SortFilters.MOST_UPVOTES:
            return sortByUpvotes(feedbacks);
        case SortFilters.LEAST_UPVOTES:
            return sortByLeastUpvotes(feedbacks);
        case SortFilters.MOST_COMMENTS:
            return sortByComments(feedbacks);
        case SortFilters.LEAST_COMMENTS:
            return sortByLeastComments(feedbacks);
        default:
            return feedbacks;
    }
}

