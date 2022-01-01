import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
   })
export class PatternSearchService {
    // Observable string sources
    private patternTermSource = new Subject<string>();
    
    // Observable string streams
    searchTermAnnounce: Observable<string> = this.patternTermSource.asObservable();

    // Service message commands
    announceSearchTerm(term: string) {
        this.patternTermSource.next(term);
    }
}