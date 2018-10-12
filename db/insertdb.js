const pg = require('pg');


function dbInsertPost(id, post, cb) {
    const dbConnectString = 'postgres://fsjvpxwr:iHjdd-pYbARl_r5mHK1gaR0KGM7fJknR@elmer.db.elephantsql.com:5432/fsjvpxwr';

    const pgClient = new pg.Client({
        connectionString: dbConnectString,
    });

    pgClient.connect();

    console.log(id);
    console.log(post);

    let queryObj = {
        text: `insert into userposts (id, posts) values ($1,$2)`,
        values: [id, post]
    };

    pgClient.query(queryObj, (err, response) => {
        if (err) {
            console.log(err);
            pgClient.end();
            cb(err, null);

        } else {
            console.log(response);
            pgClient.end();
            cb(null, true);
        };

    });
}

module.exports = dbInsertPost;