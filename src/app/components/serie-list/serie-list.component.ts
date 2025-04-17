import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-serie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './serie-list.component.html',
  styleUrl: './serie-list.component.css'
})
export class SerieListComponent {
  series: any[] = [];

  constructor(private serieService: SeriesService) {}

  ngOnInit(): void {
    this.loadBestSeries();
  }

  loadBestSeries(): void {
    this.serieService.getBestSeries().subscribe((response: any) => {
      this.series = response.results;
    });
  }
}
