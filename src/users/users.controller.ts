import { Controller, Get, Post, Delete, Res, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @AllowUnauthorized()
  @Post('register/user')
  registeruser(@Req() req: Request, @Res() res: Response) {
    this.usersService
      .registerUser(req, res)
      .then((result) => {
        console.log('register', result);

        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @AllowUnauthorized()
  @Post('login')
  signIn(@Req() req: Request, @Res() res: Response) {
    this.usersService
      .signIn(req, res)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @AllowUnauthorized()
  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    return this.usersService
      .create(req, res)
      .then((result) => {
        console.log('result', result);

        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  @AllowUnauthorized()
  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.usersService
      .findAll(req, res)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  @AllowUnauthorized()
  @Get(':id')
  findOne(@Req() req: Request, @Res() res: Response) {
    return this.usersService
      .findOne(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  @AllowUnauthorized()
  @Put(':id')
  update(@Req() req: Request, @Res() res: Response) {
    return this.usersService
      .update(req.params.id, req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @Delete(':id')
  remove(@Req() req: Request, @Res() res: Response) {
    return this.usersService
      .remove(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}
