export interface ToteMessageSummary {
    toteId: number;
    messages: ToteRawMessage[];
}

export interface ToteRawMessage {
    id: number;
    message: string;
    messageType: string;
    creationTime: string;
}
