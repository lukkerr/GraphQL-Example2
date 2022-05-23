const { db } = require("../database/dbConnector");

const typeUser = `
    extend type Query {
        users: [User]
        user(id: Int!): User
        login(email: String!, password: String!): User
    }

    extend type Mutation {
        addUser(name: String!, email: String!, password: String!): User
        delUser(id: Int!): Boolean
        updateUser(id: Int!, name: String!, email: String!, password: String!): User
    }

    type User {
        id: Int!
        email: String!
        name: String!
        password: String!
    }
`;

const resolversUser = {
    users: async () => {
        return await db.manyOrNone(`SELECT * FROM users`);
    },
    user: async (fields) => {
        return await db.oneOrNone(`SELECT * FROM users WHERE id = $1`, [ fields.id ]);
    },
    login: async (fields) => {
        return await db.oneOrNone(`SELECT * FROM users WHERE email = $1 AND password = $2`, [fields.email, fields.password]);
    },
    addUser: async (fields) => {
        return await db.oneOrNone(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, password`, [fields.name, fields.email, fields.password]);
    },
    delUser: async (fields) => {
        return await db.oneOrNone(`DELETE FROM users WHERE id = $1 RETURNING id, name, email, password`, [fields.id]);
    },
    updateUser: async (fields) => {
        return await db.oneOrNone(`UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1 RETURNING id, name, email, password`, [fields.id, fields.name, fields.email, fields.password]);
    }
}

module.exports = { typeUser, resolversUser };