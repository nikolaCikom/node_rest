import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authLogin = async (username, password) => {
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Password did not match!');
    }

    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '15m' });

    return { status: 200, message: 'Authorized!', token };
  } catch (error) {
    throw error;
  }
};

const authRegister = async (username, password, repeatPassword, email, name) => {
  try {
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      return { success: false, message: 'Username already exists' };
    }

    if (password !== repeatPassword) {
      return { success: false, message: 'Passwords do not match' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, password: hashedPassword, email, name });

    return { success: true, message: 'User registered successfully!' };
  } catch (error) {
    console.log(error);

    return { success: false, message: 'Server error.' };
  }
};

const authLogout = async () => {
  return true;
};

export default { authLogin, authRegister, authLogout };
