import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { Request, Response } from 'express';

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    return this.userRoleService
      .create(req, res)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.userRoleService
      .findAll(req, res)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @Get(':id')
  findOne (@Req() req: Request, @Res() res: Response) {
    return this.userRoleService
      .findOne(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }

  @Put(':id')
   update( @Req() req: Request, @Res() res: Response,
  ) {
     return this.userRoleService
       .update(req.params.id, req.body)
       .then((result) => {
         res.send(result);
       })
       .catch((err) => {
         res.send(err);
       });
  }

  @Delete(':id')
  async remove(@Req() req: Request, @Res() res: Response) {
    return this.userRoleService
      .remove(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}



