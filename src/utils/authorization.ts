import { UserDocument } from '@models/user.model';

export default class Authorization {
  private static instance: Authorization | null = null;
  private user: UserDocument | null = null;

  private constructor() {}

  /**
   * Cria a instância se não existir e define o usuário.
   * Pode ser chamada apenas uma vez por request (em middleware, por exemplo).
   */
  public static configure(user: UserDocument): Authorization {
    const instance = Authorization.getInstance();
    instance.user = user;
    return instance;
  }

  /**
   * Recupera a instância já configurada.
   * Lança erro se chamada antes do configure.
   */
  public static getInstance(): Authorization {
    if (!Authorization.instance) {
      Authorization.instance = new Authorization();
    }

    return Authorization.instance;
  }

  /**
   * Acessa o usuário atual.
   */
  public getUser(): UserDocument {
    if (!this.user) {
      throw new Error('Authorization user has not been configured');
    }

    return this.user;
  }
}
