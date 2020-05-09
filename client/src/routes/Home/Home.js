import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

const GET_TODO = gql`
  query GetTodos {
    getTodos {
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
  const [addTodo, { data: addTodoData }] = useMutation(CREATE_TODO);
  console.log(data);
  return (
    <div>Home</div>
  );
};

export default Home;