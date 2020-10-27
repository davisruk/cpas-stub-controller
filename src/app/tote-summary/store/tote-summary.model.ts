export interface PageRequestDetail {
    pageNumber: number;
    pageSize: number;
    searchTerm: string;
}

export interface PageResponseDetail {
    totalPages: number;
    totalEntries: number;
}

export interface PageDetail {
    pageRequestDetail: PageRequestDetail;
    pageResponseDetail: PageResponseDetail;
}

export interface ToteSummary {
    id: number;
    toteType: string;
    orderId: string;
    sheetNumber: string;
    containerIdentifier: string;
}

export interface ToteSummaryPage {
    toteEntries: ToteSummary[];
    pageDetail: PageDetail;
}
