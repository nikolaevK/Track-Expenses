import React, { useContext, useEffect, useState } from "react";
import Chart from "../components/Chart";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { UserContext } from "../context/userContext";
import BarChart from "../components/BarChart";
import { useBudgets } from "../context/BudgetsContext";
import { totalBudget, totalExpenses } from "../utils/totalExpenses";

const summary = () => {
  const { username } = useContext(UserContext);
  const { getBudgets, getExpenses } = useBudgets();
  const [budgetTotal, setBudgetTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [budgetInfo, setbudgetInfo] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const budgetResults = await getBudgets();
    const expenseResults = await getExpenses();

    if (!(budgetResults && expenseResults)) return;

    for (let i = 0; i < budgetResults.length; i++) {
      const updateValue = {
        [budgetResults[i].budgetName as string]: budgetResults[i]
          .budgetId as string,
      };
      setbudgetInfo((budgetInfo) => ({
        ...budgetInfo,
        ...updateValue,
      }));
    }

    setBudgetTotal(totalBudget(budgetResults));
    setExpensesTotal(totalExpenses(expenseResults));
  }

  return (
    <section className="bg-split-gray-white min-h-screen pb-24 md:pb-36">
      <Link href={`/${username}`}>
        <IoIosArrowBack className="absolute h-8 w-8 top-8 left-8" />
      </Link>
      <div className="mt-24 md:mt-32 px-10">
        <h1 className="text-3xl text-gray4 md:text-[3rem]">Report</h1>
        <div className="md:flex md:justify-center md:items-center">
          <Chart budgetTotal={budgetTotal} expensesTotal={expensesTotal} />
        </div>
        <div className="flex justify-center mt-8 gap-8 md:gap-[40%] items-center bg-gray w-full h-[120px] rounded-sm shadow-lg">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-gray3 font-semibold md:text-3xl">Spent</span>
            <span className="text-3xl md:text-4xl text-gray4">
              ${expensesTotal}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-gray3 md:text-3xl font-semibold">Budget</span>
            <span className="text-3xl md:text-4xl text-gray4">
              ${budgetTotal}
            </span>
          </div>
        </div>
        {budgetInfo && (
          <BarChart budgetInfo={budgetInfo} expensesTotal={expensesTotal} />
        )}
      </div>
    </section>
  );
};

export default summary;
