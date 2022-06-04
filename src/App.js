import { useState } from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

const App = () => {
  const expenses = [
    {
      id: '1',
      date: new Date(2021, 2, 28),
      title: 'Car Insurance',
      amount: 294,
    },
    {
      id: '2',
      date: new Date(2021, 2, 28),
      title: 'Car Insurance',
      amount: 294,
    },
    {
      id: '3',
      date: new Date(2021, 2, 28),
      title: 'Car Insurance',
      amount: 294,
    },
  ];

  const addExpenseHandler = (expense) => {
    expenses.push(expense);
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default App;
