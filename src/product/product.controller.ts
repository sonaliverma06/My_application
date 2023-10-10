import {
  Controller,
  Get,
  Post,
  Delete,
  Req,
  Res,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Request, Response} from 'express';
import { AllowUnauthorized } from 'src/auth/decorators/allow-unauthorized';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @AllowUnauthorized()
  @Post()
  create(@Req() req: Request, @Res() res: Response) {
    return this.productService
      .create(req, res)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
  @AllowUnauthorized()
  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.productService
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
    return this.productService
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
  update(@Req() req:Request , @Res() res:Response) {
    return this.productService.update(req.params.id, req.body).then((response)=>{
     res.send(response)
    }).catch((err)=>{
      res.send(err);
    })
  }

  @AllowUnauthorized()
  @Delete(':id')
  remove(@Req () req:Request, @Res() res:Response) {
    return this.productService
    .remove(req.params.id).then((response)=>{
      res.send(response)
    }).catch((err)=>{
    res.send(err);
    })
  }
}


