import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, default: 'guest-user' })
  name?: string;
  @Prop({ type: String})
  email?: string;
  @Prop({ type: Boolean, required: true, default: false })
  emailVerified!: boolean;
  @Prop({ type: String })
  image?: string;
  @Prop({type: String, required: true, unique: true})
  phone!:string
  @Prop({ type: String })
  refreshToken!: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Course'}] })
  courses?: Types.ObjectId[];
  @Prop({type: String, required: true, enum:['User','Admin'], default: 'User'})
  role!: string;
  @Prop({type: Boolean})
  banned!: boolean;
  @Prop({type: String})
  banReason!: string;
  @Prop({type: Date})
  banExpires!: Date;

}
export const UserSchema = SchemaFactory.createForClass(User);