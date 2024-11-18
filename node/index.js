const express = require('express')
const app = express()
const port = 3000
const mysql = require('mysql')

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}

function createConnection() {
  return mysql.createConnection(config)
}

function connectToDatabase() {
  const connection = createConnection()
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar no banco de dados:', err)
      setTimeout(connectToDatabase, 5000) 
    } else {
      console.log('Conectado ao banco de dados!')
      const sql = `INSERT INTO people(nome, idade) values('Thiago', 28)`
      connection.query(sql, (err) => {
        if (err) {
          console.error('Erro ao executar a query:', err)
        }
      })
      connection.end()
    }
  })
}

connectToDatabase()

async function getAllPeople() {
    const connection = createConnection()
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM people'
      connection.query(sql, (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
      connection.end()
    })
  }

app.get('/', async (req, res) => {
    const people = await getAllPeople()
    res.send('<h1>Full Cycle Rocks!</h1>\n' +
        '- Lista de nomes cadastrada no banco de dados.\n' +
        `<table border="1">
    <thead>
      <tr>
        <th>Nome</th>
        <th>Idade</th>
      </tr>
    </thead>
    <tbody>
        ${people.map((person) => {
            return `
                <tr>
                    <td>${person.nome}</td>
                    <td>${person.idade}</td>
                </tr>            
            `
        })}
    </tbody>
  </table>`
    )
})

app.listen(port, () => {
  console.log('Rodando na porta', port)
})
