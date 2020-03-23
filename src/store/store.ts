import { createStore, combineReducers, Action, applyMiddleware } from "redux";
import { systemReducer } from "./system/reducer";
import { chatReducer } from "./chat/reducer";
import thunk, { ThunkAction } from "redux-thunk";
import { roomReducer } from "./room/reducer";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import { suggestionsReducer } from "./room/suggestions/reducer";
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const composeEnhancers = composeWithDevTools({});
const reducers = combineReducers({
  suggestions: suggestionsReducer,
  system: systemReducer,
  chat: chatReducer,
  roomState: roomReducer
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof reducers>;
