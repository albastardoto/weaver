import { Grid } from "@material-ui/core";
import React, { FC } from "react";
import { Suggestion } from "../../store/room/suggestions/types";

export interface SuggestionsListProps {
  suggestions: Suggestion[];
}

const SuggestionsList: FC<SuggestionsListProps> = (props) => {
  return (
    <Grid item xs={12} className="SidePanelInner Queue">
      {props.suggestions.map((suggestion: Suggestion) => {
        return (
          <div key={suggestion.id}>
            <img alt="thumbnail" srcSet={suggestion.thumbnailURL} />
            <h2 className="SearchSuggestionTitle">
              {suggestion.title.substr(0, 40)}
            </h2>
          </div>
        );
      })}
    </Grid>
  );
};

export default SuggestionsList;
