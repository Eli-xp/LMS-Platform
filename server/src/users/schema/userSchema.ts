import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, default: 'guest-user' })
  name!: string;
  @Prop({ type: String})
  email?: string;
  @Prop({ type: Boolean, required: true, default: false })
  emailVerified!: boolean;
  @Prop({ type: String })
  image?: string;
  @Prop({type: String, required: true, unique: true})
  phone!:string
}
export const UserSchema = SchemaFactory.createForClass(User);