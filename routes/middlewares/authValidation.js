import User from '../../models/User.js';
import bcrypt from 'bcryptjs';
import { statusCode } from '../../config/index.js';

export const registerValidation = async (req, res, next) => {
  const { profile_id } = req.body;
  try {
    const isUser = await User.findOne({ profile_id });
    if (isUser) {
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
  const { profile_id, password } = req.body;
  try {
    const user = await User.findOne({ profile_id });
    if (!user) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: '아이디 혹은 비밀번호를 정확하게 입력하세요.',
      });
    }

    const isCorrectPassword = await comparePassword(password, user.password);
    if (!isCorrectPassword) {
      return res.status(statusCode.UNAUTHORIZED).json({
        message: '아이디 혹은 비밀번호를 정확하게 입력하세요.',
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
