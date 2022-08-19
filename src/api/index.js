import axios from "axios";
const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => await axios.get(apiEndpoint);

export const fetchSinglePost = async (id) => await axios.get(`${apiEndpoint}${id}`);

export const createPost = async (post) => await axios.post(apiEndpoint, post);

export const updatePost = async (updatedPost) => await axios.post(apiEndpoint , updatedPost);

export const deletePost = async (id) => await axios.delete(`${apiEndpoint}${id}`);
