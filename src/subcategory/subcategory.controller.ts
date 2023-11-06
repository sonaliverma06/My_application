import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Put } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { Request, Response } from 'express';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized';
@Controller('subcategory')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @AllowUnauthorized()
  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    return this.subcategoryService
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
    return this.subcategoryService
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
    return this.subcategoryService
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
    return this.subcategoryService
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
    return this.subcategoryService
      .remove(req.params.id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}


