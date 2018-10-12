const pg = require('pg');

function verifyUser(id, password, cb) {
    const dbConnectString = `postgres://fsjvpxwr:iHjdd-pYbARl_r5mHK1gaR0KGM7fJknR@elmer.db.elephantsql.com:5432/fsjvpxwr`;


    const pgClient = new pg.Client({
        connectionString: dbConnectString,
    })

    pgClient.connect();

    queryObj = {
        text: "select * from userCredentials where id = $1 and password = $2",
        values: [id, password]
    }



    pgClient.query(queryObj, (err, response) => {
        if (err) {
            console.log(err);
            pgClient.end();
            cb(err, null);
        } else {
            console.log(response);
            pgClient.end();
            cb(null, response.rowCount);
        }
    });

}

module.exports = verifyUser;


