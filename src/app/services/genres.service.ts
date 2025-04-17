import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private apiUrl = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

  private headers = new HttpHeaders({
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDUzNmNhM2E4ZjQxZWZkMzE0MGMwYTdkN2IwNzlhMSIsIm5iZiI6MTc0NDcwNjg3Mi4yMDcsInN1YiI6IjY3ZmUxZDM4MzAxNTM2MzI4NmQ5N2ViMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2VGuxk1WNagA2GggTb3-CZesjPGhCeJs6QvWcnRu6rk',
    'accept': 'application/json'
  });

  constructor(private http: HttpClient) {}

  getGenres(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers }).pipe(
      tap((data: any) => {
        localStorage.setItem('genres', JSON.stringify(data));
      }),
      catchError(error => {
        console.error('Error API : ', error);
        const cached = localStorage.getItem('genres');
        return of(cached ? JSON.parse(cached) : []);
      })
    );
  }
}
