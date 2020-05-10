import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_TODO = gql`
  query GetTodos {
    getTodos {
      _id
      name
      description
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($name: String, $description: String) {
    createTodo(name: $name, description: $description) {
      name
      description
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_TODO);
  const [addTodo] = useMutation(CREATE_TODO);
  const [state, setState] = useState({ name: '', description: '' });
  const onChange = ({ target }) => setState(prevState => ({ ...prevState, [target.name]: target.value }));
  const save = () => {
    addTodo({
      variables: {
        name: state.name,
        description: state.description
      },
      refetchQueries: ['GetTodos']
    });
  };

  if (error) {
    return <h1>Whoops! Error!</h1>;
  }

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div style={{display: 'flex', justifyContent:'center', marginTop: '10%'}}>
      <div style={{display: 'flex', flexDirection:'column'}}>
        <h3 style={{margin: '0px'}}>Add something to do!</h3>
        <input placeholder='Name' name='name' onChange={onChange} />
        <input placeholder='Description' name='description' onChange={onChange} />
        <button onClick={save}>Save</button>
      </div>
      <table style={{border:'1px solid black'}}>
        <tr>
          <th style={{border:'1px solid black'}}>name</th>
          <th style={{border:'1px solid black'}}>description</th>
        </tr>
        {(data && data.getTodos || []).map(todo => (
          <tr key={todo._id}>
            <td style={{border:'1px solid black'}}>{todo.name}</td>
            <td style={{border:'1px solid black'}}>{todo.description}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Home;