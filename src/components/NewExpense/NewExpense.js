import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const saveExpanseDataHandler = (enteredExpanseDate) => {
    const expenseData = { ...enteredExpanseDate, id: Math.random().toString() };
    props.onAddExpense(expenseData);
  };

  return (
    <div className='new-expense'>
      <ExpenseForm onSaveExpenseData={saveExpanseDataHandler} />
    </div>
  );
};

export default NewExpense;
