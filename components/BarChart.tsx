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
  "#cdb4db",
  "#e28743",
  "#567ffe",
  "#84e9c7",
  "#f380a2",
  "#264653",
  "#2a9d8f",
  "#8d99ae",
  "#edf2f4",
  "#023047",
  "#b5838d",
  "#ff006e",
  "#bb3e03",
  "#5e548e",
  "#231942",
  "#dde7c7",
  "#a3c4f3",
  "#fde2e4",
  "#affc41",
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
      <div className="flex w-full relative bg-gray3 h-4 mt-6 ">
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
              className="h-full text-transparent cursor-pointer hover:text-gray2 font-semibold"
            >
              <p className="absolute h-4 w-full my-0 top-[-1.5rem] left-0 text-center">
                ${totalBudgetExpense[key]} - {key}
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(totalBudgetExpense)?.map((key, index) => {
          return (
            <div key={index} className="flex items-center gap-1">
              <div
                className="h-3 w-3 md:h-4 md:w-4 rounded-full"
                style={{
                  backgroundColor: `${COLOR_ARRAY[index]}`,
                }}
              />
              <p className="text-xs whitespace-nowrap md:whitespace-normal overflow-scroll md:overflow-visible md:text-xl">
                {key}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
