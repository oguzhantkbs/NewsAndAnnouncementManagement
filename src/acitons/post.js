import * as api from "../api/index";
import * as types from "./types";

export const fetchPosts = () => async (dispatch) => {
    try {
        // const { data } = await api.fetchPosts();
        dispatch({
            type: types.FETCH_POSTS,
            // payload: data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const fetchSinglePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchSinglePost(id);
        dispatch({
            type: types.FETCH_SINGLE_POST,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        console.log("createPost", post);
        // const { data } = await api.createPost(post);
        dispatch({
            type: types.CREATE_POST,
            payload: post,
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (post) => async (dispatch) => {
    try {
        console.log("update posta", post);

        // const { data } = await api.updatePost(post.id, post);

        dispatch({ type: types.UPDATE_POST, payload: post });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        // const { data } = await api.deletePost(id);
        console.log("Delete data", id);
        dispatch({
            type: types.DELETE_POST,
            payload: id,
        });
    } catch (error) {
        console.log(error);
    }
};

