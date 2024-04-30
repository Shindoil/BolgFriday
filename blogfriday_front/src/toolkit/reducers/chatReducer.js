import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  chatDetail: {},
  friendList: [],
  nlplist: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    getChat(state, action) {
      state.chatDetail = action.payload.data;
    },
    getFriendList(state, action) {
      state.friendList = action.payload.friendList;
    },
    getNLPsearch(state, action) {
      state.nlplist = action.payload.data;
    },
  },
});

export const chatRoomReducers = chatSlice.actions;

export default chatSlice;
