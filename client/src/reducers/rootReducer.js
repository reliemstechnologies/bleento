import { combineReducers } from "redux";
import brandReducer from "./brandReducer";
import influencerReducer from "./influencerReducer";
import engagementReducer from "./engagementReducer";

export const rootReducer = combineReducers({
  brand: brandReducer,
  influencer: influencerReducer,
  engagement: engagementReducer,
});
