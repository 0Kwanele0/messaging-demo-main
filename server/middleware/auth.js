const express = require("express");
const jwt = require("jsonwebtoken");

const auth = express();

auth.use((req, res, next) => {
  const userUrl = { url: "api/user", method: "POST" };

  let isPublic = false;

  if (req.url.includes(userUrl.url) && req.method == userUrl.method) {
    isPublic = true;
    next();
  }

  if (!isPublic) {
    const token = req.header("x-auth-token");
    if (token) {
      jwt.verify(token, process.env.SECRETE_KEY, (err, token) => {
        if (err) {
          res.send("Invalid token");
        } else {
          next();
        }
      });
    } else {
      res.send("access denied");
    }
  }
});

module.exports = auth;
