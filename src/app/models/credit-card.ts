export interface CreditCard {
    id: number | undefined;  // <- Allow undefined for new records
    name: string;
    description: string;
    bankName: string;
    maxCredit: number;
    interestRate: number;
    active: boolean;
    recommendedScore: string;
    annualFee: number;
    termsAndConditions: string;
    createdDate: string;
    updatedDate: string;
}