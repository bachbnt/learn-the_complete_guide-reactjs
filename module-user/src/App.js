import { useState, Fragment } from 'react';
import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [users, setUsers] = useState([]);

  const onAddUser = (user) => {
    setUsers((prev) => {
      return [...prev, user];
    });
  };

  return (
    <Fragment>
      <AddUser onAddUser={onAddUser} />
      <UsersList users={users} />
    </Fragment>
  );
}

export default App;
