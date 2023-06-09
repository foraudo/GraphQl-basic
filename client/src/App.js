import { useEffect, useState } from 'react';
import './App.css';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';
import { CREATE_USER } from './mutations/user';

function App() {
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS)
  const {data:oneUser, loading: loadingOneUser} = useQuery(GET_ONE_USER, {
    variables: {
        id: 1 // передает строку . Из за это полсе запроса возвращается null
    }
})
  const [ newUser ] = useMutation(CREATE_USER)
  const [users, setUsers] = useState([])
  const [username, setUserName] = useState('')
  const [age = 3, setUserAge] = useState('')
  
  console.log(oneUser);
  
  useEffect(() => {
    if(!loading)
    setUsers(data.getAllUsers)
  }, [data])

  if(loading){
    return <h1>Loading...</h1>
  }

  const addUser = (e) => {
    e.preventDefault()
    newUser({
      variables:{
        input: {
          username, age
        }
      }
    }).then(({data}) => {
      setUserAge('')
      setUserName('')
      refetch()
    }).catch(console.log)
  }

  const getAllUsersRefetch = (e) => {
    e.preventDefault()
    console.log('getAllUsersRefetch');
    refetch()
  }

  return (
    <div>
      <form>
        <input type="text" value={username} placeholder='имя' onChange={(e) => setUserName(e.target.value)}/>
        <input type="number"  value={age} placeholder='возраст' onChange={(e) => setUserAge(+e.target.value)}/>
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Создать</button>
          <button onClick={(e) => getAllUsersRefetch(e)}>Получить</button>
        </div>
      </form>
      <div>
        {users.map(user =>
          <div className="user" key={user.username}>{user.id}. {user.username} {user.age}</div>
        )}
      </div>
    </div>
  );
}

export default App;
