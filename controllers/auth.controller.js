import authService from '../services/auth.service.js';
import { userLoginSchema } from '../validation/userLoginSchema.js';
import { userRegisterSchema } from '../validation/userRegisterSchema.js';

const loginAuth = async (req, res) => {
  try {
    const { username, password } = req.body;

    const validate = userLoginSchema.validate(req.body);

    if (validate.error) {
      return res.status(401).json({ success: false, message: validate.error.message });
    }

    if (!username || !password) {
      res.status(400).json('Username and password are required');
    }

    const user = await authService.authLogin(username, password);

    res.cookie('token', user.token, { httpOnly: true });

    return res.status(user.status).json(user.message);
  } catch (error) {
    console.error(error);

    return res.status(401).json({ error: error.message });
  }
};

const registerAuth = async (req, res) => {
  try {
    const { username, password, repeatPassword, email, name } = req.body;

    const validate = userRegisterSchema.validate(req.body);

    if (validate.error) {
      return res.status(401).json({ success: false, message: validate.error.message });
    }

    const user = await authService.authRegister(username, password, repeatPassword, email, name);

    if (user.success) {
      return res.status(201).json(user.message);
    } else {
      return res.status(409).json(user.message);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json('Server error');
  }
};

const logoutAuth = async (req, res) => {
  try {
    const user = await authService.authLogout();

    if (user) {
      res.clearCookie('token');
      res.redirect('login');
    } else {
      res.status(500).json({ error: 'Logout failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error.' });
  }
};

export default { loginAuth, registerAuth, logoutAuth };
