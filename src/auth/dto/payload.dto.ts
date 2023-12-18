export class PayloadDto {
  sub: number;
  username: string;
  exp: number;

  constructor(sub: number, username: string, exp: number) {
    this.sub = sub;
    this.username = username;
    this.exp = exp;
  }
}
