import { Sort } from '@angular/material/sort';
import { createReducer, on } from '@ngrx/store';
import { ToteMessageSummary, ToteRawMessage } from './messages.model';
import { loadToteMessagesSuccess, sortMessages } from './tote-messages.actions';


export const toteMessagesFeatureKey = 'toteMessages';

export interface State {
  toteMessages: ToteMessageSummary;
}

export const initialState: State = {
  toteMessages: {
    toteId: 0,
    messages: []
  }
};

export const reducer = createReducer(
  initialState,
  on(loadToteMessagesSuccess, (state, { result }) => ({ ...state, toteMessages: result })),
  on(sortMessages, (state, { sort }) => sortMessageState (state, sort))
);

function sortMessageState(state: State, sort: Sort): State{
  const messages = [...state.toteMessages.messages];
  if (sort.direction === 'asc'){
    messages.sort(compareMessagesAsc);
  } else {
    messages.sort(compareMessagesDesc);
  }
  return { ...state, toteMessages: {...state.toteMessages, messages}};
}

function compareMessages(a: ToteRawMessage , b: ToteRawMessage): number{
  let retVal = 0;
  if (a.creationTime < b.creationTime) {
    retVal = -1;
  } else if (a.creationTime > b.creationTime) {
    retVal  = 1;
  }
  return retVal;
}

function compareMessagesAsc(a: ToteRawMessage , b: ToteRawMessage): number{
  return compareMessages(a, b);
}

function compareMessagesDesc(a: ToteRawMessage , b: ToteRawMessage): number{
  return compareMessages(a, b) * -1;
}


