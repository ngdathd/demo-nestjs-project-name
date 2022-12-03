import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import Joi from 'joi';
import { CatService } from './cat.service';
import { CreateCatDto } from './create-cat.dto';
import {
  createCatSchema,
  getCatSchema,
  JoiValidationPipe,
} from './joi.vaidate';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get(':id')
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  findAll(
    @Query() cat: CreateCatDto,
    @Param('id', new JoiValidationPipe(getCatSchema)) id: number,
    @Headers('test') test: number,
  ): string {
    console.log(cat.name);
    console.log(id);
    console.log(test);
    return this.catService.findAll();
  }

  @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  create(
    @Body(new JoiValidationPipe(createCatSchema)) cat: CreateCatDto,
  ): string {
    console.log(cat);
    return this.catService.createOne();
  }
}
