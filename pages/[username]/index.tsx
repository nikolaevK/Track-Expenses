import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase/firebase";
import { VscSignOut } from "react-icons/vsc";
import ProgressBar from "../../components/ProgressBar";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  collectionGroup,
  DocumentData,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { calcPercent, totalExpenses } from "../../utils/totalExpenses";
import BudgetSlide from "../../components/BudgetSlide";
import Link from "next/link";
import { UserContext } from "../../context/userContext";

const landingPage = () => {
  const router = useRouter();
  const { userUid } = useContext(UserContext);
  const [budgets, setBudgets] = useState<DocumentData[]>();
  const [expenses, setExpenses] = useState<DocumentData[]>();

  useEffect(() => {
    // Subscribes for changes of budgets and expenses
    // In order to reflect instant data changes on deletes
    let unsubscribeBudgets;
    let unsubscribeExpenses;
    if (userUid) {
      const refBudget = collection(db, "users", userUid, "budgets");
      const qBudget = query(refBudget);

      unsubscribeBudgets = onSnapshot(qBudget, (snapshot) => {
        const budgetArr: DocumentData[] = [];
        snapshot.forEach((doc) => {
          budgetArr.push(doc.data());
        });
        setBudgets(budgetArr);
      });

      const refExpenses = collectionGroup(db, "expenses");
      const qExpenses = query(refExpenses, where("userId", "==", userUid));

      unsubscribeExpenses = onSnapshot(qExpenses, (snapshot) => {
        const expenseArr: DocumentData[] = [];
        snapshot.forEach((doc) => {
          expenseArr.push(doc.data());
        });
        setExpenses(expenseArr);
      });
    }

    // Unsubscribes on component unmount
    return unsubscribeBudgets && unsubscribeExpenses;
  }, []);

  function logOut() {
    signOut(auth).then(() => {
      router.push("/");
    });
  }

  return (
    <section className="flex flex-col items-center bg-split-blue-gray min-h-screen h-fit min-w-full pb-32">
      <VscSignOut
        onClick={logOut}
        className="absolute text-gray h-8 w-8 md:h-12 md:w-12 right-8 top-8 md:cursor-pointer md:hover:scale-105 md:transition-transform"
      />
      <h1 className="absolute left-10 top-28 md:left-[10%] md:top-[16vh] xl:left-[40%] font-light opacity-70 text-gray text-2xl md:text-[5rem]">
        Overview
      </h1>
      <div className="w-[80%] h-[20vh] md:h-[15rem] mt-[45%] md:mt-[28vh] bg-gray bg-opacity-[95%] rounded-sm shadow-md">
        <div className="flex flex-col xl:items-center md:gap-4 my-4 mx-4 text-gray2">
          <span className="md:text-[2rem]">THIS MONTH</span>
          <span className="text-4xl md:text-[4rem] text-gray4">
            ${expenses && totalExpenses(expenses)}
          </span>
        </div>
        <div className="mx-4 pt-4 md:pt-12">
          {expenses && budgets && (
            <ProgressBar progressPercent={calcPercent(expenses, budgets)} />
          )}
        </div>
      </div>
      <div className="w-[80%] h-fit flex flex-col mt-12">
        {budgets?.map((budget) => (
          <BudgetSlide budget={budget} key={budget.budgetId} />
        ))}
      </div>
      <Link
        href="/addexpense"
        className="py-2 px-6 mt-4 w-[80%] text-center bg-orange1 text-white font-medium rounded-sm shadow-[5px_5px_10px_#d39e61] md:hover:scale-105 md:transition-transform"
      >
        <button>Add +</button>
      </Link>
    </section>
  );
};

export default landingPage;
