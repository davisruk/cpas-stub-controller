export interface ToteMessage {
    // really message is a Tote instance from the backend
    // this is a big class and we don't need to model it
    // as we're only ever interested in its JSON
    message: any;
    rawMessage: string;
}
