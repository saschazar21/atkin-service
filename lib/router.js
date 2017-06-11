const cp = !!process.env.USE_CHILDPROCESS;  // Check if environment variable is set.

const express = require('express');
const path = require('path');

/**
 * Dependent on environment variable, either require child process or atkin.
 */
const atkin = cp ? null : require('./atkin');
const childProcess = cp ? require('child_process') : null;

const scriptPath = path.resolve(__dirname, './atkin.js');
const router = express.Router();

router.get('/', (req, res) => {
  const limit = req.query.limit || null;
  let sent = false;

  if (!cp && atkin !== null) {
    try {
      const primes = atkin(limit);
      return res.json({
        primes: primes.slice(-10),
        date: new Date().toISOString(),
      });
    } catch (e) {
      return res.status(500).send(e.msg || e);
    }
  } else {
    const proc = childProcess.fork(scriptPath);

    proc.send(limit);
    proc.on('message', (data) => {
      res.json({
        primes: data.slice(-10),
        date: new Date().toISOString(),
      });
      sent = true;
      return proc.kill();
    });

    proc.on('exit', (code, msg) => {
      if (!sent) {
        return res.error(500).send(`Application exited with error: ${msg || code}`);
      }
      return true;
    });
  }
  return true;
});

module.exports = router;
