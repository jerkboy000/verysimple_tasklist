import { gql } from "@apollo/client";


export const SIGNUP_MUTATION = gql`
  mutation SignupUser($name: String, $email: String!, $password: String!, $confirmPassword: String!) {
    signupUser(name: $name, email: $email, password: $password, confirmPassword: $confirmPassword) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      user {
        id
        name
        email
      }
      token
    }
  }
`;

export const CREATE_TASK = gql`
  mutation createTask(
    $user_id: Int!
    $name: String!
    $description: String!
    $note: String!
    $due_date: String!
    $status: String!
  ) {
    createTask(
      user_id: $user_id
      name: $name
      description: $description
      note: $note
      due_date: $due_date
      status: $status
    ) {
      id
      name
      description
      note
      due_date
      status
      user_id
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $name: String
    $description: String
    $note: String
    $due_date: String
    $status: String
  ) {
    updateTask(
      id: $id
      name: $name
      description: $description
      note: $note
      due_date: $due_date
      status: $status
    ) {
      id
      user_id
      name
      description
      note
      due_date
      status
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;