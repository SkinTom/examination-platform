import { Component, OnInit } from '@angular/core';
import { Result } from '../result';
import { ResultService } from '../result.service';

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {

  result: Result;
  idResult: number;

  constructor(private resultService: ResultService) { }

  ngOnInit(): void {
    this.idResult = history.state.resultId;

    this.resultService.getResultById(this.idResult).subscribe(data => {
      this.result = data;
    })
  }

}
