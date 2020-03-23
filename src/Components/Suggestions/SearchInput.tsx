import React, { FC } from "react";
import { TextField, Grid } from "@material-ui/core";

export interface SearchInputProps {
  searchValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = props => {
  return (
    <TextField
      id="standard-search"
      label="Search field"
      type="search"
      className="MainSearchBox"
      value={props.searchValue}
      onChange={props.onChange}
    />
  );
};

export default SearchInput;
