import React, { FC } from "react";
import { Source } from "../../store/room/suggestions/types";

export interface SuggestionPlayerProps {
  source: Source;
  url: string;
  startTime: number;
}

const SuggestionPlayer: FC<SuggestionPlayerProps> = (props) => {
  return <h1>player</h1>;
};

export default SuggestionPlayer;
