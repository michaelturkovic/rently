import { User } from '../interfaces';
import { UserModel, UserDoc } from '../models';

export class UserService {
  public create = async (user: User): Promise<UserDoc> => {
    return await UserModel.create(user);
  };

  public findByEmail = async (email: string): Promise<UserDoc | null> => {
    return await UserModel.findOne({ email });
  };

  public findById = async (id: string): Promise<UserDoc | null> => {
    return await UserModel.findById(id).select('-password');
  };

  public findAll = async (): Promise<UserDoc[]> => {
    return await UserModel.find().select('-password');
  };
}
