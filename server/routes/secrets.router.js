const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// Unauthenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user:', req.user);
  pool
    .query(
      `SELECT "user".id, "user".clearance_level, "secret".secrecy_level, "secret".content 
      FROM "user", "secret" 
      WHERE "secret".secrecy_level < 13;`
    )
    .then((results) => res.send(results.rows))
    .catch((error) => {
      console.log('Error making SELECT for secrets:', error);
      res.sendStatus(500);
    });
});

module.exports = router;
