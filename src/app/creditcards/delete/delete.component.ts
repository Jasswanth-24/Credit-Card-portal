import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnDestroy {

  creditCardId!: number;
  private destroy$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matSnackBar: MatSnackBar,
    private creditcardsService: CreditcardsService
  ) {
    const idParam = this.activatedRoute.snapshot.paramMap.get("id");
    const parsedId = Number(idParam);

    if (!isNaN(parsedId)) {
      this.creditCardId = parsedId;

      this.creditcardsService.deleteCreditCard(this.creditCardId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.showSuccessMessage("Credit Card Deleted Successfully");
            this.router.navigate(['creditcards']);
          },
          error: (error) => {
            this.showSuccessMessage("Failed to delete credit card. It may not exist.");
            this.router.navigate(['creditcards']);
            console.error("Delete error:", error);
          }
        });

    } else {
      this.showSuccessMessage("Invalid Credit Card ID.");
      this.router.navigate(['creditcards']);
    }
  }

  showSuccessMessage(message: string) {
    this.matSnackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
