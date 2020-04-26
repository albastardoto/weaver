import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";
import thunk, { ThunkAction } from "redux-thunk";
import { chatReducer } from "./chat/reducer";
import { roomReducer } from "./room/reducer";
import { suggestionsReducer } from "./room/suggestions/reducer";
import { systemReducer } from "./system/reducer";
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const composeEnhancers = composeWithDevTools({});
const reducers = combineReducers({
  system: systemReducer,
  chat: chatReducer,
  roomState: roomReducer,
  suggestions: suggestionsReducer,
});

export const store = createStore(
  reducers,
  loadFromSessionStorage(),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(saveToSessionStorage);

export type RootState = ReturnType<typeof reducers>;
function saveToSessionStorage() {
  try {
    const serializedState = JSON.stringify({ system: store.getState().system });
    sessionStorage.setItem("systemState", serializedState);
  } catch (error) {
    console.error(error);
  }
}
function loadFromSessionStorage() {
  try {
    const serializedState = sessionStorage.getItem("systemState");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
  }
}
