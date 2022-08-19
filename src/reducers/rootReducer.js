import { combineReducers } from "redux";
import AnnouncementReducer from "./Announcement";
import postReducer from "./post";


const rootReducer = combineReducers({ posts: postReducer, announcements: AnnouncementReducer });

export default rootReducer;