import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

   private subscription:Subscription | undefined;

  constructor(private creditcardsService:CreditcardsService,
    private router:Router ){

  }

  newCreditCard:CreditCard = {

    id: this.generateNumericId(), // Auto-generated numeric ID
    name:"",
    description: "",
    bankName: "",
    maxCredit: 5000,
    interestRate: 12,
    active: true,
    recommendedScore: "100-700",
    annualFee: 12,
    termsAndConditions: "Terms and conditions for the credit card",
    createdDate: Date(),
    updatedDate: Date()

    
    
  }

  generateNumericId(): number {
    return Date.now(); // Returns current timestamp as a unique number
  }


  saveCreditCard(){
    this.subscription=this.creditcardsService.createCreditCard(this.newCreditCard).subscribe(data=>{
      alert("Credit Card Added");
      this.router.navigate(['creditcards']);
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
