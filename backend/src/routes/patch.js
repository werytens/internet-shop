import { connection } from "../database.js";

export default (req, res) => {
    if (req.body === undefined) return res.json({ error: "No body provided" });
    if (req.body.text === undefined)
        return res.json({ error: "No text provided" });

    connection.query(
        "UPDATE CLIENTS SET id = ?, FCS = ?, createDate = ?, updateDate = ?, contacts = ? WHERE id = ?",
        [
            req.body.text.id,
            req.body.text.FCS,
            req.body.text.createDate,
            req.body.text.updateDate,
            JSON.stringify(req.body.text.contacts),
            req.body.text.oldId
        ],
        (err, rows, fields) => {
            if (err) throw err;
            res.json({});
        }
    );
};
// update clients set id = 2 where id = 3;
// id | FCS                               | createDate               | updateDate               | contacts