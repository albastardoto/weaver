import React, { FC } from "react";
import { SearchSuggestion } from "../../store/room/suggestions/types";
import { Grid } from "@material-ui/core";

export interface SearchSuggestionsProps {
  searchSuggestions: SearchSuggestion[];
}

const SearchSuggestions: FC<SearchSuggestionsProps> = props => {
  return (
    <div className="SearchSuggestionList">
      {props.searchSuggestions.map((suggestion: SearchSuggestion) => {
        return (
          <Grid
            key={suggestion.title}
            item
            xs={12}
            className="SearchSuggestion"
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={1}
            >
              <Grid item>
                <img srcSet={suggestion.thumbnailURL} />
              </Grid>
              <Grid item>
                <h2 className="SearchSuggestionTitle">
                  {suggestion.title.substr(0, 40)}
                </h2>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};

export default SearchSuggestions;
