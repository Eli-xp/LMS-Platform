import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Chapter extends Document{
    @Prop({ type: String, required: true })
    title!: string;
    @Prop({type: Number, required: true})
    position!: number;
    @Prop({type: Types.ObjectId, ref: 'Course', required: true})
    courseId!: Types.ObjectId;
    @Prop({type: [{ type: Types.ObjectId, ref: 'Lesson'}]})
    lessons!: Types.ObjectId[];
}

export const ChapterSchema = SchemaFactory.createForClass(Chapter);