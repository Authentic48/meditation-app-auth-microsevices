import bcrypt from 'bcryptjs';

export class Password {
  static async Hash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassowrd = bcrypt.hashSync(password, salt);

    return await hashedPassowrd;
  }

  static async Compare(storepassword: string, suppliedPassword: string) {
    return await bcrypt.compare(suppliedPassword, storepassword);
  }
}
