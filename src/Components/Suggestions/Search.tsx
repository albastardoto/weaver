import React, { Component, Dispatch } from "react";
import SearchInput from "./SearchInput";
import { Grid } from "@material-ui/core";

import "./Suggestions.css";
import { connect } from "react-redux";
import { getSearchList } from "../../store/room/suggestions/actions";
import {
  SearchSuggestion,
  SuggestionState
} from "../../store/room/suggestions/types";
import { RootState } from "../../store/store";
import SearchSuggestions from "./SearchSuggestions";

interface searchProps {}

export interface State {
  searchValue: string;
  searchTimer?: NodeJS.Timer;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {
      searchValue: ""
    };
  }

  public render() {
    return (
      <Grid
        direction="column"
        container
        justify="flex-start"
        alignItems="flex-start"
      >
        <SearchInput
          searchValue={this.state.searchValue}
          onChange={this.onChange}
        />
        <SearchSuggestions
          searchSuggestions={this.props.searchState.searchSuggestions}
        />
      </Grid>
    );
  }
  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (this.state.searchTimer) {
      clearTimeout(this.state.searchTimer);
    }
    this.setState({
      searchValue: event.target.value,
      searchTimer: setTimeout(() => {
        this.props.getSearchSuggestions(this.state.searchValue);
      }, 200)
    });
  }
}
const mapStateToProps = (state: RootState) => ({
  searchState: state.suggestions.searchState
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getSearchSuggestions: (query: string) => {
      dispatch(getSearchList(query));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
