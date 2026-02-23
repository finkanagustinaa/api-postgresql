const pool = require('../config/database');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const hashedPassword = await argon2.hash(password);

    await pool.query(
      'INSERT INTO users (email, password) VALUES ($1,$2)',
      [email, hashedPassword]
    );

    res.status(201).json({ message: "Register berhasil" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query(
      'SELECT * FROM users WHERE email=$1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const user = userResult.rows[0];

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword) {
      return res.status(400).json({ message: "Password salah" });
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await pool.query(
      'UPDATE users SET refresh_token=$1 WHERE id=$2',
      [refreshToken, user.id]
    );

    res.json({ accessToken, refreshToken });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token diperlukan" });
    }

    const userResult = await pool.query(
      'SELECT * FROM users WHERE refresh_token=$1',
      [refreshToken]
    );

    if (userResult.rows.length === 0) {
      return res.status(403).json({ message: "Refresh token tidak valid" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Refresh token expired" });
      }

      const newAccessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.profile = async (req, res) => {
  const user = await pool.query(
    'SELECT id, email FROM users WHERE id=$1',
    [req.user.userId]
  );

  res.json(user.rows[0]);
};