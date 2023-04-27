import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { createContext, ReactNode, useContext } from "react";
import { db } from "../firebase/firebase";
import { UserContext } from "./userContext";
import { v4 as uuidv4 } from "uuid";

interface BudgetsProviderProps {
  children: ReactNode;
}

interface AddExpense {
  description: string;
  amount: number;
  budgetId: string;
}

interface AddBudget {
  budgetName: string;
  max: number;
}

interface DeleteExpense {
  budgetId: string;
  expenseId: string;
}

interface BudgetsContext {
  addBudget: ({ budgetName, max }: AddBudget) => void;
  addExpense: ({ description, amount, budgetId }: AddExpense) => void;
  deleteExpense: ({ budgetId, expenseId }: DeleteExpense) => void;
  deleteBudget: (budgetId: string) => void;
  getBudgets: () => Promise<DocumentData[] | undefined>;
  getExpenses: () => Promise<DocumentData[] | undefined>;
  getBudgetExpenses: (budgetId: string) => Promise<DocumentData[] | undefined>;
}

const BudgetsContext = createContext({} as BudgetsContext);

export function useBudgets() {
  return useContext(BudgetsContext);
}

export function BudgetsProvider({ children }: BudgetsProviderProps) {
  const { userUid } = useContext(UserContext);

  async function addBudget({ budgetName, max }: AddBudget) {
    const budgetId = uuidv4();
    await setDoc(doc(db, "users", userUid, "budgets", budgetId), {
      max,
      userId: userUid,
      budgetName,
      budgetId,
      createdAt: serverTimestamp(),
    });
  }

  async function addExpense({ description, amount, budgetId }: AddExpense) {
    const expenseId = uuidv4();
    await setDoc(
      doc(db, "users", userUid, "budgets", budgetId, "expenses", expenseId),
      {
        description,
        userId: userUid,
        expenseId: expenseId,
        amount,
        budgetId,
        createdAt: serverTimestamp(),
      }
    );
  }

  async function getBudgets() {
    if (userUid) {
      const ref = collection(db, "users", userUid, "budgets");
      const q = query(ref);
      const querySnap = (await getDocs(q)).docs.map((doc) => doc.data());

      if (querySnap) {
        return querySnap;
      }
    }
  }

  async function getExpenses() {
    if (userUid) {
      const ref = collectionGroup(db, "expenses");
      const q = query(
        ref,
        where("userId", "==", userUid),
        orderBy("createdAt", "asc")
      ); // where budgetId == budgetId
      const querySnap = (await getDocs(q)).docs.map((doc) => doc.data());

      if (querySnap) {
        return querySnap;
      }
    }
  }

  // CHECK WHERE THEY USED!!!
  async function getBudgetExpenses(budgetId: string) {
    if (userUid) {
      const ref = collection(
        db,
        "users",
        userUid,
        "budgets",
        budgetId,
        "expenses"
      );
      const q = query(ref, orderBy("createdAt", "asc"));
      const querySnap = (await getDocs(q)).docs.map((doc) => doc.data());

      if (querySnap) {
        return querySnap;
      }
    }
  }

  async function deleteExpense({ budgetId, expenseId }: DeleteExpense) {
    await deleteDoc(
      doc(db, "users", userUid, "budgets", budgetId, "expenses", expenseId)
    );
  }

  async function deleteBudget(budgetId: string) {
    const batch = writeBatch(db);

    const expensesRef = query(
      collectionGroup(db, "expenses"),
      where("budgetId", "==", budgetId)
    );

    (await getDocs(expensesRef)).docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    await deleteDoc(doc(db, "users", userUid, "budgets", budgetId));
  }

  return (
    <BudgetsContext.Provider
      value={{
        addBudget,
        addExpense,
        getBudgets,
        getExpenses,
        getBudgetExpenses,
        deleteExpense,
        deleteBudget,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
}
