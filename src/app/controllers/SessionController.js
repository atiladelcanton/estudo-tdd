const { User } = require("../models");

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Como fiz a negacao, ele vai entrar aqui se o password informado for diferente do cadastrado na base de dados
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: "User ou Password Incorrect" });
    }
    return res.status(200).json({ user, token: user.generateToken() });
  }
}

module.exports = new SessionController();
