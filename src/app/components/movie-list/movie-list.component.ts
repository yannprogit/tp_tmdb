import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService } from '../../services/movies.service';
import { GenresService } from '../../services/genres.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  genres: any[] = [];
  selectedGenreId: number | null = null;
  filteredMovies: any[] = [];

  constructor(private movieService: MoviesService, private genreService: GenresService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe((response: any) => {
      this.movies = response.results;
      this.filteredMovies = [...this.movies];
    });
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }

  filterMoviesByGenre() {
    if (!this.selectedGenreId) {
      this.filteredMovies = [...this.movies];
      return;
    }

    this.filteredMovies = this.movies.filter((movie) =>
      movie.genre_ids.includes(this.selectedGenreId!)
    );
  }
}