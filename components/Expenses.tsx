import { DocumentData } from "firebase/firestore";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { useBudgets } from "../context/BudgetsContext";

const Expenses = ({ expenses }: DocumentData) => {
  const { deleteExpense } = useBudgets();

  function removeExpense(expenseId: string, budgetId: string) {
    deleteExpense({ expenseId, budgetId });
  }

  return (
    <div>
      {expenses?.map((expense: DocumentData) => (
        <div
          key={expense.expenseId}
          className="flex whitespace-nowrap md:whitespace-normal overflow-scroll md:overflow-visible justify-between items-center gap-1 px-6 py-4 border-b border-gray1"
        >
          <div className="flex items-center gap-2">
            <div>
              <TiShoppingCart className="h-6 w-6 text-gray3" />
            </div>
            <span className="text-gray3 font-semibold ">
              {expense?.description}
            </span>
          </div>
          <div className="flex justify-center gap-2 md:gap-8 items-center">
            <span className="font-semibold">${expense?.amount}</span>
            <RiDeleteBin5Line
              onClick={() => removeExpense(expense.expenseId, expense.budgetId)}
              className="text-orange1 md:hover:scale-110 md:transition-transform md:cursor-pointer"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Expenses;
