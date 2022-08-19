import * as types from "../acitons/types";

const initialState = {
  posts: [],
  currentPost: null,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case types.FETCH_SINGLE_POST:
      return {
        ...state,
        currentPost: action.payload,
      };
    case types.CREATE_POST:
      console.log("payload", action.payload);
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    
    case types.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          console.log("Update post : ", post)
          if (post.newstitle === action.payload.newstitle) {
            return action.payload;
          } else {
            return post;
          }
        }),
        currentPost: action.payload,
      };
   
    case types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        currentPost: null,
      };
   
    default:
      return {
        ...state,
      };
  }
};

export default postReducer;