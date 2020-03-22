import React, { FC } from "react";

export interface SuggestionProps {
  data: SuggestionType;
}
export type SuggestionType = {
  name: string;
  votes: number;
};

const Suggestion: FC<SuggestionProps> = props => {
  return (
    <div>
      <h1>props.data.name</h1>
    </div>
  );
};

export default Suggestion;
