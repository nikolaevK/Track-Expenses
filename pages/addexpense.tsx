import { DocumentData } from "firebase/firestore";
import React, {
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useBudgets } from "../context/BudgetsContext";
import { UserContext } from "../context/userContext";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/router";

const addexpense = () => {
  const { addBudget, addExpense, getBudgets } = useBudgets();
  const { username } = useContext(UserContext);
  const [budgets, setBudgets] = useState<DocumentData[]>();
  const router = useRouter();

  // Add Expense Form Refs
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetIdRef = useRef<HTMLSelectElement>(null);
  const expenseFormRef = useRef<HTMLFormElement>(null);

  // Add budget Form Refs
  const budgetNameRef = useRef<HTMLInputElement>(null);
  const budgetMaxRef = useRef<HTMLInputElement>(null);
  const budgetFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    Budgets();
  }, []);

  async function Budgets() {
    const result = await getBudgets();
    setBudgets(result);
  }

  function createExpense(e: FormEvent) {
    e.preventDefault();

    if (
      descriptionRef.current?.value &&
      amountRef.current?.value &&
      budgetIdRef.current?.value
    ) {
      addExpense({
        description: descriptionRef?.current?.value,
        amount: parseFloat(amountRef?.current?.value),
        budgetId: budgetIdRef?.current?.value,
      });

      expenseFormRef?.current?.reset();
    }
    router.push(`/${username}`);
  }

  function createBudget(e: FormEvent) {
    e.preventDefault();

    if (budgetMaxRef.current?.value && budgetNameRef.current) {
      addBudget({
        budgetName: budgetNameRef.current?.value,
        max: parseFloat(budgetMaxRef?.current?.value),
      });

      budgetFormRef?.current?.reset();
    }
    router.push(`/${username}`);
  }

  return (
    <section className="bg-split-white-gray min-h-screen pb-28">
      <Link href={`/${username}`}>
        <IoIosArrowBack className="absolute h-8 w-8 top-8 left-8" />
      </Link>
      <div className="h-full pt-24 px-10 rounded-sm">
        <h1 className="text-3xl text-gray4">Add a Bill</h1>
        <div className="h-[30rem] w-full mt-6 bg-[#fdfdfd] shadow-sm py-6 px-4">
          <form
            ref={expenseFormRef}
            onSubmit={(e) => createExpense(e)}
            className="flex flex-col gap-1"
          >
            <label className="text-gray4 font-semibold pb-3">DESCRIPTION</label>
            <input
              className="border border-gray1 text-xl rounded-sm px-2 py-4 mb-4 outline-none focus:outline-orange1 focus:border-none"
              type="text"
              placeholder="Expense"
              ref={descriptionRef}
              required
            />
            <label className="text-gray4 font-semibold pb-3">AMOUNT</label>
            <input
              className="border border-gray1 text-xl rounded-sm px-2 py-4 mb-4 outline-none focus:outline-orange1 focus:border-none"
              type="text"
              placeholder="$$"
              ref={amountRef}
              required
            />
            <label className="mb-2 text-lg text-gray4 font-medium text-gray-900 ">
              Select Budget
            </label>
            <select
              required
              id="countries"
              ref={budgetIdRef}
              className="bg-gray2 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-orange1 focus:border-orange1 block w-full p-4 text-white"
            >
              {budgets?.map((budget) => (
                <option value={budget.budgetId} key={budget.budgetId}>
                  {budget.budgetName}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="w-full bg-orange1 text-white font-semibold py-4 mt-4 rounded-sm shadow-[5px_5px_10px_#d39e61] md:hover:scale-[1.015] md:transition-transform"
            >
              Add Bill
            </button>
          </form>
        </div>
      </div>
      <div className="h-full pt-12 px-10 rounded-sm">
        <h1 className="text-3xl text-gray4">Add a Budget</h1>
        <div className="h-[23rem] w-full mt-6 bg-[#fdfdfd] shadow-sm py-6 px-4">
          <form
            onSubmit={(e) => createBudget(e)}
            className="flex flex-col gap-1"
            ref={budgetFormRef}
          >
            <label className="text-gray4 font-semibold pb-3">NAME</label>
            <input
              className="border border-gray1 text-xl rounded-sm px-2 py-4 mb-4 outline-none focus:outline-orange1 focus:border-none"
              type="text"
              ref={budgetNameRef}
              placeholder="Budget Name"
              required
            />
            <label className="text-gray4 font-semibold pb-3">
              MAX SPENDING
            </label>
            <input
              className="border border-gray1 text-xl rounded-sm px-2 py-4 mb-4 outline-none focus:outline-orange1 focus:border-none"
              type="text"
              ref={budgetMaxRef}
              placeholder="Max Amount"
              required
            />
            <button
              type="submit"
              className="w-full bg-orange1 text-white font-semibold py-4 rounded-sm shadow-[5px_5px_10px_#d39e61] md:hover:scale-[1.015] md:transition-transform"
            >
              Add Budget
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default addexpense;
