import { Status } from "../../fetch";
import {
  ADD_SUGGESTION,
  DELETE_SUGGESTION,
  SET_SEARCH_FETCH,
  SET_SEARCH_SUGGESTIONS,
  Suggestion,
  SuggestionActionTypes,
  UPDATE_SUGGESTION,
} from "./types";

const initState: any = {
  suggestions: [],
  searchState: {
    searchFetchStatus: Status.SUCCESS,
    searchSuggestions: [],
  },
};

export function suggestionsReducer(
  state = initState,
  action: SuggestionActionTypes
) {
  switch (action.type) {
    case ADD_SUGGESTION:
      return { ...state, suggestions: [...state.suggestions, action.payload] };
    case SET_SEARCH_SUGGESTIONS:
      return {
        ...state,
        searchState: {
          ...state.searchState,
          searchSuggestions: action.payload,
        },
      };
    case SET_SEARCH_FETCH:
      return {
        ...state,
        searchState: {
          ...state.searchState,
          searchFetchStatus: action.payload,
        },
      };
    case UPDATE_SUGGESTION:
      const suggestions = state.suggestions.map((suggestion: Suggestion) => {
        if (suggestion.id !== action.payload.id) {
          return suggestion;
        }
        return { ...suggestion, ...action.payload };
      });
      return {
        ...state,
        suggestions,
      };
    case DELETE_SUGGESTION:
      return {
        ...state,
        suggestions: state.suggestions.filter(
          (sugg: Suggestion) => sugg.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
