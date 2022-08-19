import * as api from "../api/index";
import * as types from "./types";

export const createAnnouncement = (announcement) => async (dispatch) => {
    try {
        console.log("createAnnouncement", announcement);
        // const { data } = await api.createAnnouncement(announcement);
        dispatch({
            type: types.CREATE_ANNOUNCEMENT,
            payload: announcement,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateAnnouncement = (announcement) => async (dispatch) => {
    try {
        console.log("update Announcement", announcement);

        // const { data } = await api.updateAnnouncement(announcement.id, announcement);

        dispatch({ type: types.UPDATE_ANNOUNCEMENT, payload: announcement });
    } catch (error) {
        console.log(error.message);
    }
};


export const deleteAnnouncement = (id) => async (dispatch) => {
    try {
        // const { data } = await api.deleteAnnouncement(id);
        console.log("Delete Announcement ", id);
        dispatch({
            type: types.DELETE_ANNOUNCEMENT,
            payload: id,
        });
    } catch (error) {
        console.log(error);
    }
};