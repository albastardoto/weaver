import {
  SuggestionState,
  SuggestionActionTypes,
  ADD_SUGGESTION,
  SET_SEARCH_SUGGESTIONS,
  SET_SUGGESTION_FETCH,
  SET_SEARCH_FETCH,
  UPDATE_SUGGESTION,
  Suggestion,
} from "./types";
import { Status } from "../../fetch";

const initState: SuggestionState = {
  suggestions: [],
  searchState: {
    searchFetchStatus: Status.SUCCESS,
    searchSuggestions: [],
  },
};

export function suggestionsReducer(
  state: any = initState,
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
      return {
        ...state,
        suggestions: state.suggestions.map((suggestion: Suggestion) => {
          if (suggestion.id === action.payload.id) {
            return action.payload;
          }
          return suggestion;
        }),
      };
    default:
      return state;
  }
}
