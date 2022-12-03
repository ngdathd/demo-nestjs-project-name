import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import * as Joi from 'joi';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.AnySchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    const { error } = this.schema.validate(value);
    console.log(error);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

export const createCatSchema: ObjectSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  // repeat_password: Joi.ref('password'),
  // access_token: [Joi.string(), Joi.number()],
  // birth_year: Joi.number().integer().min(1900).max(2013),
  // email: Joi.string().email({
  //   minDomainSegments: 2,
  //   tlds: { allow: ['com', 'net'] },
  // }),
}).with('username', 'password');
// .xor('password', 'access_token')
// .with('password', 'repeat_password');

export const getCatSchema: Joi.NumberSchema = Joi.number()
  // .alphanum()
  .min(3)
  .max(30)
  .required();
