import { DocumentData } from "firebase/firestore";

export function totalExpenses(expenses: DocumentData[]) {
  let total = 0;
  if (expenses) {
    expenses?.forEach((expense) => {
      total += expense.amount;
    });
  }

  return total;
}

export function totalBudget(budgets: DocumentData[]) {
  let total = 0;
  if (budgets) {
    budgets.forEach((budget) => (total += budget.max));
  }

  return total;
}

export function calcPercent(expenses: DocumentData[], budgets: DocumentData[]) {
  return Math.round((totalExpenses(expenses) / totalBudget(budgets)) * 100);
}
