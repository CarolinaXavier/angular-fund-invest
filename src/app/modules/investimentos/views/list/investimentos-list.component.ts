import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { InvestimentoDados } from '../../model/investimento.model';
import { InvestimentoService } from '../../services/investimento.service';

@Component({
  selector: 'app-investimentos-list',
  templateUrl: './investimentos-list.component.html',
  styleUrls: ['./investimentos-list.component.scss']
})
export class InvestimentosListComponent implements OnInit {
  investlist: InvestimentoDados[] = [];

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private service: InvestimentoService
  ) {  }

  ngOnInit(): void {
    console.log('asd')
    this.search();
  }

  search() {
    this.service.all().subscribe((resp: any) => {
      if(resp.response.status == 200)
        this.investlist = resp.response.data.listaInvestimentos;
      console.log(this.investlist)
    });
  }

  edit(item) {
    let navigationExtras: NavigationExtras = {
      state: {
        model: item
      }
    };
    this.router.navigate(['/investimento/edit'], navigationExtras);
  }

}
