import { connection } from "../database.js";

export default (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });
    if (req.body.text === undefined)
        return res.json({ error: "No text provided" });

    connection.query(
        "INSERT INTO clients VALUES (?, ?, ?, ?, ?);",
        [
            req.body.text.id,
            req.body.text.fcs,
            req.body.text.createDate,
            req.body.text.changeDate,
            JSON.stringify(req.body.text.contacts)
        ],
        (err, rows, fields) => {
            if (err) throw err;
            res.json({});
        }
    );
};
