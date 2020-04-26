import { Grid } from "@material-ui/core";
import React, { Component, Dispatch } from "react";
import { connect } from "react-redux";
import {
  addToQueue,
  getSearchList,
} from "../../store/room/suggestions/actions";
import { SearchSuggestion } from "../../store/room/suggestions/types";
import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";
import "./Suggestions.scss";

export interface State {
  searchValue: string;
  searchTimer?: NodeJS.Timer;
  inputFocus: boolean;
}

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = {
      searchValue: "",
      inputFocus: false,
    };
  }

  public render() {
    return (
      <Grid
        direction="column"
        container
        justify="flex-start"
        alignItems="center"
      >
        <SearchInput
          searchValue={this.state.searchValue}
          onChange={this.onChange}
          onSetFocus={this.setFocus.bind(this)}
          onSetBlur={this.setBlur.bind(this)}
        />
        <SearchSuggestions
          searchSuggestions={this.props.searchState.searchSuggestions}
          inputFocus={this.state.inputFocus}
          addSuggestion={this.props.addSuggestion}
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
      }, 200),
    });
  }
  setFocus() {
    this.setState({ inputFocus: true });
  }
  setBlur(event: any) {
    console.log(event);
    setTimeout(() => {
      this.setState({ inputFocus: false });
    }, 100);
  }
}
const mapStateToProps = (state: any) => ({
  searchState: state.suggestions.searchState,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    getSearchSuggestions: (query: string) => {
      dispatch(getSearchList(query));
    },
    addSuggestion: (suggestion: SearchSuggestion) => {
      dispatch(addToQueue(suggestion));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
