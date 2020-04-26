import React, { FC } from "react";
import { SearchSuggestion } from "../../store/room/suggestions/types";

export interface SearchSuggestionsProps {
  searchSuggestions: SearchSuggestion[];
  inputFocus: boolean;
  addSuggestion: (suggestion: SearchSuggestion) => void;
}

const SearchSuggestions: FC<SearchSuggestionsProps> = (props) => {
  const classSuffix = props.inputFocus ? " focused" : "";
  const createTitle = (suggestion: SearchSuggestion) => {
    return { __html: suggestion.title };
  };
  return (
    <div className={"SearchSuggestionList" + classSuffix}>
      {props.searchSuggestions.map((suggestion: SearchSuggestion) => {
        return (
          <div
            key={suggestion.thumbnailURL}
            className="SearchSuggestion"
            onClick={() => {
              props.addSuggestion(suggestion);
            }}
          >
            <img
              alt="search suggestion thumbnail"
              srcSet={suggestion.thumbnailURL}
            />
            <h2
              className="SearchSuggestionTitle"
              dangerouslySetInnerHTML={createTitle(suggestion)}
            ></h2>
          </div>
        );
      })}
    </div>
  );
};

export default SearchSuggestions;
