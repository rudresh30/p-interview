const pg = require('pg');

function getAllPosts(cb) {
    const dbConnectString = `postgres://fsjvpxwr:iHjdd-pYbARl_r5mHK1gaR0KGM7fJknR@elmer.db.elephantsql.com:5432/fsjvpxwr`;


    const pgClient = new pg.Client({
        connectionString: dbConnectString,
    })

    pgClient.connect();

    queryObj = {
        text: "select * from userposts",
    }



    pgClient.query(queryObj, (err, response) => {
        if (err) {
            console.log(err);
            pgClient.end();
            cb(err, null);
        } else {
            console.log(response);
            pgClient.end();
            cb(null, response.rows);
        }
    });

}

module.exports = getAllPosts;
