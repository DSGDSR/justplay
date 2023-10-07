export const apiUrl = process.env.SERVER_HOST
    ? `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/api`
    : '/api'