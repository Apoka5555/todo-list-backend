import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({
    example: 'User 1',
    description: 'User login',
  })
  @Prop({ unique: [true, 'Duplicate login entered'] })
  login: string;

  @ApiProperty({
    example: '1234456',
    description: 'User password',
  })
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
