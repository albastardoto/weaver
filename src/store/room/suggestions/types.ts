import { FetchState, Status } from "../../fetch";

export enum Source {
  YOUTUBE,
}
export interface Suggestion {
  source: Source;
  sourceId: string;
  id: string;
  title: string;
  thumbnailURL: string;
  likes: number;
  timestamp: number;
  active: boolean;
}
export interface ActiveSuggestion extends Suggestion {
  playing: boolean;
  startTime: number;
  stopTime: number;
}
export interface SearchSuggestion {
  title: string;
  thumbnailURL: string;
  sourceId: string;
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
export const UPDATE_SUGGESTION = "UPDATE_SUGGESTION";
export const DELETE_SUGGESTION = "DELETE_SUGGESTION";

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
interface updateSuggestion {
  type: typeof UPDATE_SUGGESTION;
  payload: Suggestion;
}
interface deleteSuggestion {
  type: typeof DELETE_SUGGESTION;
  payload: string;
}
export type SuggestionActionTypes =
  | addSuggestion
  | setSearchSuggestions
  | updateSuggestion
  | SetSearchFetch
  | deleteSuggestion;
