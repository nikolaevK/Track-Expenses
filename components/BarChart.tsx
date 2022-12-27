import { useEffect, useState } from "react";
import { useBudgets } from "../context/BudgetsContext";
import { totalExpenses } from "../utils/totalExpenses";

interface Props {
  budgetInfo: { [key: string]: string };
  expensesTotal: number;
}

const COLOR_ARRAY = [
  "#873e23",
  "#ffc896",
  "#71b4ff",
  "#e28743",
  "#567ffe",
  "#84e9c7",
  "#f380a2",
];

const BarChart = ({ budgetInfo, expensesTotal }: Props) => {
  const [totalBudgetExpense, setTotalBudgetExpense] = useState<{
    [key: string]: number;
  }>({});
  const { getBudgetExpenses } = useBudgets();

  useEffect(() => {
    getRatios();
  }, [budgetInfo]);

  async function getRatios() {
    for (const key in budgetInfo) {
      const results = await getBudgetExpenses(budgetInfo[key]);

      if (results) {
        const updateValue = {
          [key as string]: totalExpenses(results),
        };
        setTotalBudgetExpense((totalBudgetExpense) => ({
          ...totalBudgetExpense,
          ...updateValue,
        }));
      }
    }
  }

  return (
    <div className="flex flex-col mt-6 md:mt-10">
      <h1 className="font-semibold text-gray2 md:text-2xl">
        SPENDING BREAKDOWN
      </h1>
      <div className="flex w-full bg-gray3 h-4 mt-6">
        {Object.keys(totalBudgetExpense)?.map((key, index) => {
          return (
            <div
              key={index}
              style={{
                width: `${Math.ceil(
                  (totalBudgetExpense[key] / expensesTotal) * 100
                )}%`,
                backgroundColor: `${COLOR_ARRAY[index]}`,
              }}
              className="h-full"
            ></div>
          );
        })}
      </div>
      <div className="w-full mt-6 grid grid-cols-3 gap-1">
        {Object.keys(totalBudgetExpense)?.map((key, index) => {
          return (
            <div key={index} className="flex items-center gap-1 text-center">
              <div
                className="h-2 w-2 md:h-4 md:w-4 rounded-full"
                style={{
                  backgroundColor: `${COLOR_ARRAY[index]}`,
                }}
              ></div>
              <span className="md:text-xl">{key}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
