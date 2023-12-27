import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query {
    getAllTasks {
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

export const GET_TASKS_BY_USER = gql`
  query GetTasksByUser($user_id: Int!) {
    getTasksByUser(user_id: $user_id) {
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

export const GET_TASK_DETAILS = gql`
  query GetTaskDetails($taskId: ID!) {
    getTask(id: $taskId) {
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
