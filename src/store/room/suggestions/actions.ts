import {
  Suggestion,
  SuggestionActionTypes,
  ADD_SUGGESTION,
  SET_SEARCH_FETCH,
  SearchSuggestion,
  SET_SEARCH_SUGGESTIONS
} from "./types";
import config from "../../../config.json";
import { AppThunk } from "../../store";
import { Status, FetchState } from "../../fetch";
export function addSuggestion(
  newSuggestion: Suggestion
): SuggestionActionTypes {
  return {
    type: ADD_SUGGESTION,
    payload: newSuggestion
  };
}
export function setSearchFetch(state: FetchState): SuggestionActionTypes {
  return {
    type: SET_SEARCH_FETCH,
    payload: state
  };
}

export function setSearchSuggestions(
  searchResults: SearchSuggestion[]
): SuggestionActionTypes {
  return {
    type: SET_SEARCH_SUGGESTIONS,
    payload: searchResults
  };
}

export const getSearchList = (searchString: string): AppThunk<void> => {
  return async dispatch => {
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
          thumbnailURL: element.snippet.thumbnails.default.url
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
