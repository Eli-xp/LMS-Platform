import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Lesson extends Document{
    @Prop({ type: String, required: true })
    title!: string;
    @Prop({ type: String, required: true })
    description!: string;
    @Prop({ type: String })
    thumbnailKey?: string;
    @Prop({ type: String })
    videoKey?: string;
    @Prop({ type: Number, required: true })
    position!: number;
    @Prop({ type: Types.ObjectId, ref: 'Chapter', required: true })
    chapterId!: Types.ObjectId;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
LessonSchema.index({
    chapterId: 1,
    position: 1
})