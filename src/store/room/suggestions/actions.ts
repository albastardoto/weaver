import Firebase from "@firebase/firestore-types";
import firebase from "firebase";
import config from "../../../config.json";
import db from "../../../firestore/firestore";
import { FetchState, Status } from "../../fetch";
import { AppThunk, store } from "../../store";
import {
  ADD_SUGGESTION,
  DELETE_SUGGESTION,
  SearchSuggestion,
  SET_SEARCH_FETCH,
  SET_SEARCH_SUGGESTIONS,
  Source,
  Suggestion,
  SuggestionActionTypes,
  UPDATE_SUGGESTION,
  ActiveSuggestion,
} from "./types";
export function addSuggestion(
  newSuggestion: Suggestion
): SuggestionActionTypes {
  return {
    type: ADD_SUGGESTION,
    payload: newSuggestion,
  };
}
function deleteSuggestion(id: string): SuggestionActionTypes {
  return {
    type: DELETE_SUGGESTION,
    payload: id,
  };
}
export function setSearchFetch(state: FetchState): SuggestionActionTypes {
  return {
    type: SET_SEARCH_FETCH,
    payload: state,
  };
}

export function setSearchSuggestions(
  searchResults: SearchSuggestion[]
): SuggestionActionTypes {
  return {
    type: SET_SEARCH_SUGGESTIONS,
    payload: searchResults,
  };
}
export function updateSuggestion(
  newSuggestion: Suggestion
): SuggestionActionTypes {
  return {
    type: UPDATE_SUGGESTION,
    payload: newSuggestion,
  };
}

export const getSearchList = (searchString: string): AppThunk<void> => {
  return async (dispatch) => {
    dispatch(setSearchFetch({ status: Status.PENDING }));
    try {
      let baseURL =
        "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=" +
        config.youtubeApi;
      const searchArray = searchString.split(" ");
      searchString = searchArray.join("+");
      baseURL += "&q=" + searchString;
      const result = await fetch(baseURL);
      const data = await result.json();
      let searchSuggestions: SearchSuggestion[] = [];
      data.items.forEach((element: any) => {
        searchSuggestions.push({
          title: element.snippet.title,
          sourceId: element.id.videoId,
          thumbnailURL: element.snippet.thumbnails.default.url,
        });
      });
      dispatch(setSearchSuggestions(searchSuggestions));
      dispatch(setSearchFetch({ status: Status.SUCCESS }));
    } catch (error) {
      dispatch(setSearchFetch({ status: Status.FAIL }));
      console.error(error);
    }
  };
};
export const addToQueue = (suggestion: SearchSuggestion): AppThunk<void> => {
  return async (dispatch) => {
    try {
      db.collection("rooms")
        .doc(store.getState().roomState.room.code)
        .collection("suggestions")
        .add({
          ...suggestion,
          active: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
      console.error(error);
    }
  };
};
export const startSuggestionsListener = (): AppThunk<void> => {
  return function (dispatch) {
    db.collection("rooms")
      .doc(store.getState().roomState.room.code)
      .collection("suggestions")
      .onSnapshot((querySnapshot: Firebase.QuerySnapshot) => {
        querySnapshot
          .docChanges()
          .forEach((change: Firebase.DocumentChange) => {
            if (change.type === "removed") {
              dispatch(deleteSuggestion(change.doc.id));
            }
            if (change.type === "modified" || change.type === "added") {
              const data = change.doc.data();
              if (data) {
                const suggestion = {
                  source: Source.YOUTUBE,
                  sourceId: data.sourceId,
                  likes: data.likes,
                  id: change.doc.id,
                  title: data.title,
                  thumbnailURL: data.thumbnailURL,
                  timestamp: data.timestamp,
                  active: data.active,
                  playing: data.playing,
                  startTime: data.startTime,
                  stopTime: data.stopTime,
                };
                if (
                  store
                    .getState()
                    .suggestions.suggestions.findIndex(
                      (suggestion: Suggestion) => {
                        return suggestion.id === change.doc.id;
                      }
                    ) !== -1
                ) {
                  dispatch(updateSuggestion(suggestion));
                } else {
                  dispatch(addSuggestion(suggestion));
                }
              }
            }
          });
      });
  };
};
export const removeFromQueue = (id: string): AppThunk<void> => {
  return async (dispatch) => {
    try {
      db.collection("rooms")
        .doc(store.getState().roomState.room.code)
        .collection("suggestions")
        .doc(id)
        .delete();
    } catch (error) {
      console.error(error);
    }
  };
};
export const updateActiveSuggestion = (
  suggestion: Partial<ActiveSuggestion>
): AppThunk<void> => {
  return async (dispatch) => {
    console.log(suggestion.id);
    db.collection("rooms")
      .doc(store.getState().roomState.room.code)
      .collection("suggestions")
      .doc(suggestion.id)
      .set(suggestion, { merge: true });
  };
};
