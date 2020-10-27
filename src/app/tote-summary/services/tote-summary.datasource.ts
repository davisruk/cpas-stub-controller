import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { ToteSummary } from '../store/tote-summary.model';
import { loadToteSummarys } from './../store/tote-summary.actions';
import { selectToteEntries } from './../store/tote-summary.selectors';


export class ToteSummaryDataSource implements DataSource<ToteSummary> {
    constructor(private store: Store<AppState>) { }

    connect(collectionViewer: CollectionViewer): Observable<ToteSummary[]> {
        return this.store.select(selectToteEntries);
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    loadTotes(id: number, filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 3): void {
        this.store.dispatch(loadToteSummarys({ pageRequest: { pageNumber: pageIndex, pageSize, searchTerm: filter } }));
    }
}
