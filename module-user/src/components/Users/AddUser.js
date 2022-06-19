import { useRef, useState } from 'react';
import Wrapper from '../Helpers/Wrapper';
import Button from '../UI/Button';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [error, setError] = useState();
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = (event) => {
    const enteredUsername = nameInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({ title: 'Invalid input', message: 'Input again' });
      return;
    }
    if (enteredAge < 1) {
      setError({ title: 'Invalid age', message: 'Input again > 0' });
      return;
    }
    props.onAddUser({ name: enteredUsername, age: enteredAge });
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlForm='username'>Username</label>
          <input id='username' type='text' ref={nameInputRef}></input>
          <label htmlForm='age'>Age</label>
          <input id='age' type='number' ref={ageInputRef}></input>
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
