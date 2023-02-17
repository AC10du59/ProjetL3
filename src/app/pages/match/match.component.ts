import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Imatch} from './matchInterface';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  public displayedColumns: string[] = ['clubDesktop_domicile', 'score_domicile', 'score_exterieur', 'clubDesktop_exterieur'];
  public dataSource = new MatTableDataSource<Imatch>();
  public color = '';
  public pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {
  }

  ngOnInit(): void {
    this.getMatchs(3); // afficher la journée 1 au début
    this.dataSource.paginator = this.paginator; // initialiser la pagination
  }


  getMatchs(journee: number): void {
    const url = `http://51.178.38.151/api/JSON/journee${journee}.json`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.dataSource.data = data;
      })
      .catch(err => {
        console.error(err);
      });
  }


  onChangePage(event: PageEvent): void {
    const pageIndex = event.pageIndex;
    const lastPageIndex = this.paginator.getNumberOfPages() - 1;
    this.getMatchs(pageIndex + 1);
  }


  journeeActuelle()
    :
    number {
    return this.paginator ? this.paginator.pageIndex + 1 : 1;
  }

  colorHomeTeamOnMouse(equipeDomicile
                         :
                         string
  ):
    void {
    // logique pour coloriser l'équipe domicile
  }

  colorAwayTeamOnMouse(equipeExterieur
                         :
                         string
  ):
    void {
    // logique pour coloriser l'équipe extérieur
  }


}
