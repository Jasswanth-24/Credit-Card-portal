import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  creditCard?: CreditCard;
  SearchId: number | null = null;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private creditCardService: CreditcardsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id > 0) {
        this.fetchCreditCard(id);
      } else {
        this.creditCard = undefined;
        this.errorMessage = '';
      }
    });
  }

  fetchCreditCard(id: number): void {
    this.creditCardService.getCreditCardById(id).subscribe({
      next: (card: CreditCard) => {
        this.creditCard = card;
        this.errorMessage = '';
      },
      error: () => {
        this.creditCard = undefined;
        this.errorMessage = 'Credit card not found.';
      }
    });
  }

   SearchCard(): void {
    if (this.SearchId !== null && this.SearchId > 0) {
      this.router.navigate(['creditcards/search', this.SearchId]).then(() => {
        this.SearchId = null; // reset input field after navigation
      });
    }
  }
  
}
