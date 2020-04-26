import React, { FC } from "react";
import { TextField } from "@material-ui/core";

export interface SearchInputProps {
  searchValue: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSetFocus: () => void;
  onSetBlur: (event: any) => void;
}

const SearchInput: FC<SearchInputProps> = (props) => {
  return (
    <TextField
      id="standard-search"
      label="Search field"
      type="search"
      className="MainSearchBox"
      value={props.searchValue}
      onChange={props.onChange}
      onFocus={props.onSetFocus}
      onBlur={props.onSetBlur}
    />
  );
};

export default SearchInput;
