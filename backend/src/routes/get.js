import { connection } from "../database.js";

export default ({ req, res }) => {
    connection.query("SELECT * FROM clients;", (err, rows, fields) => {
        if (err) throw err;
        res.json(rows);
    })
};
