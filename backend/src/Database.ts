import { createConnection, escape } from 'mysql'

const setting = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'damascus',
  password: process.env.DB_PASSWORD || 'damascus',
  database: process.env.DB_DATABASE || 'damascus',
}

interface AddType {
  user: {
    email: string
    password: string
    username: string
  }
}

interface SearchType {
  user: {
    id: string
    password: string
    username: string
    email: string
  }
}

export const DB = createConnection(setting)
export type TableType = 'user'

class Table<T extends TableType> {
  private table: T

  constructor(table: T) {
    this.table = table
  }

  static parseExpression(expressionArr: Array<{ [key: string]: any }>) {
    const parseArr: string[] = []
    expressionArr.forEach(expression => {
      const push = (value: string | number) => parseArr.push(`${key}=${value}`)

      const key = Object.keys(expression)[0]
      const value = expression[key]
      switch (typeof value) {
        case 'string':
          push(`"${value}"`)
          break
        case 'number':
          push(value)
          break
        case 'object':
          push(escape(JSON.stringify(value)))
          break
      }
    })
    return parseArr
  }

  find(...conditions: Array<{ [key: string]: any }>): Promise<SearchType[T][]> {
    return new Promise((rs, rj) => {
      const conditionsArr = Table.parseExpression(conditions)

      DB.query(
        `SELECT * FROM ${this.table} WHERE ${conditionsArr.join(' , ')}`,
        (err, res) => {
          if (err) rj(err)
          else rs(res)
        }
      )
    })
  }

  findOne(
    ...conditions: Array<{ [key: string]: any }>
  ): Promise<SearchType[T]> {
    return new Promise((rs, rj) => {
      const conditionsArr = Table.parseExpression(conditions)
      DB.query(
        `SELECT * FROM ${this.table} WHERE ${conditionsArr.join(' , ')}`,
        (err, res) => {
          if (err) rj(err)
          else rs(res[0])
        }
      )
    })
  }

  add(seq: string, ...values: any[]) {
    return new Promise((rs, rj) => {
      const valueArr = values.map(v => {
        if (typeof v == 'object') return `'${JSON.stringify(v)}'`
        return `"${v}"`
      })
      console.log(
        `INSERT INTO ${this.table} (${seq}) VALUES (${valueArr.join(' , ')})`
      )
      DB.query(
        `INSERT INTO ${this.table} (${seq}) VALUES (${valueArr.join(' , ')})`,
        err => {
          if (err) rj(err)
          else rs(null)
        }
      )
    })
  }

  update(
    conditions: Array<{ [key: string]: any }>,
    valueExpression: Array<{ [key: string]: any }>
  ) {
    return new Promise((rs, rj) => {
      const conditionsArr = Table.parseExpression(conditions)
      const valueArr = Table.parseExpression(valueExpression)
      DB.query(
        `UPDATE ${this.table} SET ${valueArr.join(
          ' , '
        )} WHERE ${conditionsArr.join(' ')}`,
        err => {
          if (err) rj(err)
          else rs(null)
        }
      )
    })
  }

  delete(conditions: Array<{ [key: string]: any }>) {
    return new Promise((rs, rj) => {
      const conditionsArr = Table.parseExpression(conditions)
      DB.query(
        `DELETE FROM ${this.table} WHERE ${conditionsArr.join(' ')}`,
        err => {
          if (err) rj(err)
          else rs(null)
        }
      )
    })
  }
}

export const user = new Table('user')
