import { createReducer } from '@reduxjs/toolkit';
import { 
  setExpenses, 
  addExpense, 
  removeExpense,
  setActivities,
  addActivity,
  SetExpensesAction, 
  AddExpenseAction, 
  RemoveExpenseAction,
  SetActivitiesAction,
  AddActivityAction
} from '../actions/expenseActions.ts';
import { Expense, Activity } from '../../common/models';

interface ExpenseState {
  expenses: Expense[];
  activities: Activity[];
}

const initialState: ExpenseState = {
  expenses: [],
  activities: []
};

const expenseReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setExpenses, (state, action: SetExpensesAction) => {
      return {
        ...state,
        expenses: action.payload,
      };
    })
    .addCase(addExpense, (state, action: AddExpenseAction) => {
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    })
    .addCase(removeExpense, (state, action: RemoveExpenseAction) => {
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.expenseId !== action.payload),
      };
    })
    .addCase(setActivities, (state, action: SetActivitiesAction) => {
      return {
        ...state,
        activities: action.payload,
      };
    })
    .addCase(addActivity, (state, action: AddActivityAction) => {
      return {
        ...state,
        activities: [action.payload, ...state.activities],
      };
    });
});

export default expenseReducer;

