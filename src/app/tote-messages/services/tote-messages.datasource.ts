import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { ToteRawMessage } from '../store/messages.model';
import { loadToteMessages } from '../store/tote-messages.actions';
import { selectToteRawMessages } from './../store/tote-messages.selectors';

export class ToteMessagesDataSource implements DataSource<ToteRawMessage> {
    constructor(private store: Store<AppState>) { }

    connect(collectionViewer: CollectionViewer): Observable<ToteRawMessage[]> {
        return this.store.select(selectToteRawMessages);
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    loadToteMessages(toteId: number): void {
        this.store.dispatch(loadToteMessages({toteId}));
    }
}