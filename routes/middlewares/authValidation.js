import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import { statusCode } from '../../config/index.js';

export const registerValidation = async (req, res, next) => {
  const { mail } = req.body;

  try {
    const userMail = await User.findOne({ mail });
    if (userMail) {
      return res.status(statusCode.BAD_REQUEST).json({
        message: '이미 존재하는 계정입니다.',
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const loginValidation = async (req, res, next) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });
    if (!user) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: '이메일 혹은 비밀번호를 정확하게 입력하세요.',
      });
    }

    const isCorrectPassword = comparePassword(password, user.password);
    if (!isCorrectPassword) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: '이메일 혹은 비밀번호를 정확하게 입력하세요.',
      });
    } else {
      req.user = {
        _id: user._id,
      };
      next();
    }
  } catch (err) {
    next(err);
  }
};
