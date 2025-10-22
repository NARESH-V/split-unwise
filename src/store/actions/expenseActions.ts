import { createAction } from '@reduxjs/toolkit';
import { Expense, Activity } from '../../common/models';

export const SET_EXPENSES = 'SET_EXPENSES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const SET_ACTIVITIES = 'SET_ACTIVITIES';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';

export const setExpenses = createAction(SET_EXPENSES, (expenses: Expense[]) => ({
  payload: expenses,
}));

export const addExpense = createAction(ADD_EXPENSE, (expense: Expense) => ({
  payload: expense,
}));

export const removeExpense = createAction(REMOVE_EXPENSE, (expenseId: number) => ({
  payload: expenseId,
}));

export const setActivities = createAction(SET_ACTIVITIES, (activities: Activity[]) => ({
  payload: activities,
}));

export const addActivity = createAction(ADD_ACTIVITY, (activity: Activity) => ({
  payload: activity,
}));

export type SetExpensesAction = ReturnType<typeof setExpenses>;
export type AddExpenseAction = ReturnType<typeof addExpense>;
export type RemoveExpenseAction = ReturnType<typeof removeExpense>;
export type SetActivitiesAction = ReturnType<typeof setActivities>;
export type AddActivityAction = ReturnType<typeof addActivity>;

export type ExpenseAction = 
  | SetExpensesAction 
  | AddExpenseAction 
  | RemoveExpenseAction
  | SetActivitiesAction
  | AddActivityAction;

