const gql = require("graphql-tag");

const typeDefs = gql`
  type Query {
    getUser(id: ID!): User!
    getTask(id: ID!): Task
    getAllTasks: [Task]
    getTasksByUser(user_id: Int!, page: Int!, pageSize: Int!): [Task]
    getTaskCountByUser(user_id: Int!): Int
  }

  type User {
    id: ID!
    name: String
    email: String!
    password: String!
  }

  type UserAuth {
    user: User!
    token: String!
  }

  type Task {
    id: ID!
    user_id: Int!
    name: String!
    description: String!
    note: String!
    due_date: String!
    status: String!
  }

  type Mutation {
    signupUser(
      name: String
      email: String!
      password: String!
      confirmPassword: String!
    ): UserAuth
    loginUser(email: String!, password: String!): UserAuth
    createTask(
      user_id: Int!
      name: String!
      description: String!
      note: String!
      due_date: String!
      status: String!
    ): Task
    updateTask(
      id: ID!
      name: String
      description: String
      note: String
      due_date: String
      status: String
    ): Task
    deleteTask(id: ID!): ID
  }
`;

module.exports = typeDefs;
