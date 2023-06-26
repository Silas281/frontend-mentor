import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    sortByFilterFunc
} from "../../utilities/sortFuncs";


import Data from "../../data.json";



export const fetchFeedbacks = createAsyncThunk(
    "feedbacks/fetchFeedbacks",
    async (args, thunkAPI) => {
        const feedbacks = await Data.productRequests;
        //console.log(feedbacks);
        return feedbacks;
    }
)
const feedbacks = Data.productRequests;

//create feedbacks slice
const feedbacksSlice = createSlice({
    name: "feedbacks",
    initialState: {
        feedbacks: feedbacks,
        loadingFeedbacks: false,
        hasErrorLoadingFeedbacks: false,
        selectedCategory: "all",
        selectedStatus: "all",
        sortByFilter: ''
    },
    reducers: {
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        selectStatus: (state, action) => {
            state.selectedStatus = action.payload;
        },
        sortBy: (state, action) => {
            state.sortByFilter = action.payload;
        },
        addFeedback: (state, action) => {
            state.feedbacks.push(action.payload);
            alert("Feedback Added Successfully");
            console.log("Action Payload", action.payload);
            return state;
        },
        editFeedback: (state, action) => {
            const { id, title, description, category, status } = action.payload;
            const index = state.feedbacks.findIndex(obj => obj.id === parseInt(id));
            // If the object is found in the array
            if (index !== -1) {
                // Access the object at the found index and modify its properties
                state.feedbacks[index].title = title;
                state.feedbacks[index].description = description;
                state.feedbacks[index].category = category;
                state.feedbacks[index].status = status;
                alert("Feedback edited successfully");

            } else {
                alert("Failed to edit feedback");
            }
        },
        deleteFeedback: (state, action) => {

            const index = state.feedbacks.findIndex(obj => obj.id === parseInt(action.payload));
            // If the object is found in the array
            if (index !== -1) {
                // Access the object at the found index and modify its properties
                state.feedbacks.splice(index, 1);
                alert("Feedback deleted successfully");

            } else {
                alert("Feedback not found");
            }

        },
        addComment: (state, action) => {
            let { id, comment } = action.payload;
            const index = state.feedbacks.findIndex(obj => obj.id === parseInt(id));
            // If the object is found in the array
            if (index !== -1) {
                // Access the object at the found index and modify its properties
                if (!state.feedbacks[index].comments) {
                    state.feedbacks[index]['comments'] = [];
                }
                state.feedbacks[index].comments.push(comment);
                alert("Comment added successfully");

            } else {
                alert("Failed to add comment");
            }
        },
        addReply: (state, action) => {
            const { id, commentId, reply } = action.payload;
            const index = state.feedbacks.findIndex(obj => obj.id === parseInt(id));
            // If the object is found in the array
            if (index !== -1) {
                // Access the object at the found index and modify its properties
                const commentIndex = state.feedbacks[index].comments.findIndex(obj => obj.id === parseInt(commentId));
                //check if comment and exist and has replies

                if (state.feedbacks[index].comments[commentIndex] && !state.feedbacks[index].comments[commentIndex].replies) {
                    state.feedbacks[index].comments[commentIndex]['replies'] = [];
                    // alert("Comment has no replies");
                }

                state.feedbacks[index].comments[commentIndex].replies.push(reply);
                alert("Reply added successfully");

            } else {
                alert("Failed to add reply");
            }
        }


    },
    extraReducers: {
        [fetchFeedbacks.pending]: (state) => {
            state.loadingFeedbacks = true;
        },
        [fetchFeedbacks.fulfilled]: (state, action) => {
            const feedbacks = action.payload;
            state.loadingFeedbacks = false
            state.feedbacks = feedbacks;

        },
        [fetchFeedbacks.rejected]: (state) => {
            state.hasErrorLoadingFeedbacks = true;

        }
    }
})


//selectors
export const selectAllFeedbacks = (state) => state.feedbacks.feedbacks;

export const selectFilteredFeedbacks = (state) => {
    const selectedCategory = state.feedbacks.selectedCategory.toLowerCase();
    const sortByFilter = state.feedbacks.sortByFilter;
    let feedbacks = state.feedbacks.feedbacks;

    //sortBy upvotes

    if (selectedCategory !== 'all') {
        //console.log("Here out", selectedCategory)
        feedbacks = feedbacks.filter((feedback) => feedback.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    return sortByFilterFunc(feedbacks, sortByFilter)


};

export const selectFilteredStatuses = (state, action) => {
    const selectedStatus = action.payload.toLowerCase();

    const feedbacks = state.feedbacks.feedbacks;

    if (selectedStatus === 'all') {

        return feedbacks;
    }


    return feedbacks.filter((feedback) => feedback.status.toLowerCase() === selectedStatus.toLowerCase());
};

export const selectAllSuggestions = (state) => {
    const selectedStatus = 'suggestion';

    const feedbacks = state.feedbacks.feedbacks;
    return feedbacks.filter((feedback) => feedback.status.toLowerCase() === selectedStatus.toLowerCase());
};
export const selectAllPlanned = (state) => {
    const selectedStatus = 'planned';

    const feedbacks = state.feedbacks.feedbacks;
    return feedbacks.filter((feedback) => feedback.status.toLowerCase() === selectedStatus.toLowerCase());
};
export const selectAllInProgress = (state) => {
    const selectedStatus = 'in-progress';

    const feedbacks = state.feedbacks.feedbacks;
    return feedbacks.filter((feedback) => feedback.status.toLowerCase() === selectedStatus.toLowerCase());
};

export const selectAllLive = (state) => {
    const selectedStatus = 'live';

    const feedbacks = state.feedbacks.feedbacks;
    return feedbacks.filter((feedback) => feedback.status.toLowerCase() === selectedStatus.toLowerCase());
};





//export actions
export const {
    selectCategory,
    selectStatus,
    addFeedback,
    editFeedback,
    deleteFeedback,
    addComment,
    addReply,
    sortBy

} = feedbacksSlice.actions;
//exprt reducer

export default feedbacksSlice.reducer;
