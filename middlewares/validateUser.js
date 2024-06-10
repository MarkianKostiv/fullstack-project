// middlewares/validateUser.js
function validateUser(req, res, next) {
  const { email, phoneNumber, password } = req.body;
  const errors = [];

  if (!email || !email.endsWith("@gmail.com")) {
    errors.push("Email must be a valid gmail address");
  }

  const phoneRegex = /^\+380\d{9}$/;
  if (phoneNumber && !phoneRegex.test(phoneNumber)) {
    errors.push("Phone number must be in the format +380xxxxxxxxx");
  }

  if (!password || password.length < 3) {
    errors.push("Password must be at least 3 characters long");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: true, message: errors.join(", ") });
  }

  next();
}

module.exports = validateUser;
