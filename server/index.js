const {Client} = require('pg');
const client = new Client({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "test"
});

client.connect()
.then(()=> console.log("connected successfully"))
.then(()=> client.query("INSERT INTO student(firstname, lastname, age, address, email)VALUES('Mary Ann', 'Wilters', 20, '74 S Westgate St', 'mroyster@royster.com')"))
.then(()=> client.query("select * from student"))
.then(results=> console.table(results.rows))
.catch(e=> console.log(e))
.finally(()=> client.end());