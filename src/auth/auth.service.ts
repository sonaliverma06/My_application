import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(payload): Promise<any> {
    const token = this.jwtService.sign(payload);
    //localStorage.setItem('token', token);
    return token;
  }

  async decodeAccessToken(token): Promise<any> {
    return this.jwtService.decode(token);
  }

  public static extractBearer(token) {
    return (token || ' ').split(' ')[1];
  }
}
