import { Controller, Get, Post, Delete, Req, Res, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized';
import { Request, Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @AllowUnauthorized()
  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    return this.categoriesService
      .create(req, res)
      .then((result) => {
        console.log('result', result);

        res.send(result);
      })
      .catch((err) => {
        res.send(err);
        console.log('  res.send(err);',  res.send(err));
        
      });
  }
  @AllowUnauthorized()
  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.categoriesService
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
    return this.categoriesService
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
    return this.categoriesService
      .update(req.params.id, req.body)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  @AllowUnauthorized()
  @Delete(':id')
  remove(@Req() req: Request, @Res() res: Response) {
    return this.categoriesService
      .remove(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}













