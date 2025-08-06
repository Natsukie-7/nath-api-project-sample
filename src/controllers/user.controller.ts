import User from '../models/user.model.ts';

export const getUsers: GetRequest = async (req, res, next) => {
  const users = await User.find().select('-password');

  return { status: 200, data: { users } };
};

interface GetUser {
  id: string;
}
export const getUser: GetRequest<GetUser> = async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (!(user instanceof User)) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return {
    status: 200,
    data: user,
  };
};
