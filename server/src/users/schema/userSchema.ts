import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, required: true })
  name!: string;
  @Prop({ type: String, required: true })
  email!: string;
  @Prop({ type: Boolean, required: true })
  emailVerified!: boolean;
  @Prop({ type: String })
  image?: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
