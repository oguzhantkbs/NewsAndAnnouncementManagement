import * as types from "../acitons/types";

const initialState = {
    announcements: [],
    currentAnnouncement: null,
};

const AnnouncementReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.CREATE_ANNOUNCEMENT:
            console.log("payload", action.payload);
            return {
                ...state,
                announcements: [...state.announcements, action.payload],
            };

        case types.UPDATE_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements.map((announcement) => {
                    console.log("Update announcement : ", announcement)
                    if (announcement.newstitle === action.payload.newstitle) {
                        return action.payload;
                    } else {
                        return announcement;
                    }
                }),
                currentAnnouncement: action.payload,
            };

        case types.DELETE_ANNOUNCEMENT:
            return {
                ...state,
                announcements: state.announcements.filter((announcement) => announcement.id !== action.payload),
                currentAnnouncement: null,
            };
        default:
            return {
                ...state,
            };
    }
};

export default AnnouncementReducer;