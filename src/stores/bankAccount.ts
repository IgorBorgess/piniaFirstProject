import { defineStore } from "pinia"

type BankDetails = {
    balance: number;
    transactions: Transaction[];
}

type Transaction = {
    id: number;
    type: 'charge' | 'refund' | 'payment';
    amount: number;
    status: 'pending' | 'processed'
}

export const useBankAccountStore = defineStore('bankAccount', {
    state: () => {
        return {
            balance: 0,
            transactions: []
        } as BankDetails;
    },
    getters: {
        processedTransactions: (state) => 
        state.transactions.filter((t) => t.status === 'processed'),
        runningBalance(state):number {
            return (
            this.balance +
            this.processedTransactions
            .map((t) => t.amount)
            .reduce((acc, curr) => acc + curr, 0)
            )
        }
    },

})