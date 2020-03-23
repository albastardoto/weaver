import { FetchState, Status } from "../../fetch";

enum Source {
  YOUTUBE
}
export interface Suggestion {
  source: Source;
  id: string;
  title: string;
  thumbnailURL: string;
  likes: number;
}
export interface SearchSuggestion {
  title: string;
  thumbnailURL: string;
}

export interface SuggestionState {
  suggestions: Suggestion[];
  searchState: {
    searchFetchStatus: Status;
    searchSuggestions: SearchSuggestion[];
  };
}
export const ADD_SUGGESTION = "ADD_SUGGESTION";
export const SET_SEARCH_SUGGESTIONS = "SET_SEARCH_SUGGESTIONS";
export const SET_SEARCH_FETCH = "SET_SEARCH_FETCH";
export const SET_SUGGESTION_FETCH = "SET_SUGGESTION_FETCH";

interface addSuggestion {
  type: typeof ADD_SUGGESTION;
  payload: Suggestion;
}

interface setSearchSuggestions {
  type: typeof SET_SEARCH_SUGGESTIONS;
  payload: SearchSuggestion[];
}

interface SetSearchFetch {
  type: typeof SET_SEARCH_FETCH;
  payload: FetchState;
}
export type SuggestionActionTypes =
  | addSuggestion
  | setSearchSuggestions
  | SetSearchFetch;
