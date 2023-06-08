import { connection } from "../database.js";

export default (req, res) => {
    if (req.query === undefined)
        return res.json({ error: "No query provided" });

    if (req.query.id === undefined)
        return res.json({ error: "No id provided" });

    const id = +req.query.id;
    if (id === undefined) return res.json({ error: "Invalid id" });

    connection.query(
        "DELETE FROM clients WHERE id=?;",
        [id],
        (err, rows, fields) => {
            if (err) throw err;
            if (rows.affectedRows === 0)
                return res.json({ error: "Item not found" });

            res.json({});
        }
    );
};
