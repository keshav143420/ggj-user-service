export class User {
  id!: string;
  username!: string;
  email!: string;
  passwordHash!: string;
  createdAt!: Date;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }
}
