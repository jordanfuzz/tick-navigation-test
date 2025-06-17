'use strict'

import dotenv from 'dotenv'
dotenv.config()

const e = process.env

const isDevelopment = e.NODE_ENV === 'development'

const config = {
  pg: {
    host: e.POSTGRES_HOST,
    user: e.POSTGRES_USER,
    database: e.POSTGRES_DB,
    password: e.POSTGRES_PASSWORD,
  },
  isDevelopment,
  port: 3002,
}

export default config
