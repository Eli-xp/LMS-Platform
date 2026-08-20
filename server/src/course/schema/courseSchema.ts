import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Course extends Document{
    @Prop({ type: String, required: true })
    title!: string;
    @Prop({ type: String, required: true })
    description!: string;
    @Prop({ type: Number, required: true })
    price!: Number;
    @Prop({ type: String })
    fileKey?: string;
    @Prop({ type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' })
    level!: string;
    @Prop({ type: String, required: true})
    category!: string;
    @Prop({ type: String, required: true})
    smallDescription!: string;
    @Prop({ type: String, required: true, unique: true })
    slug!: string;
    @Prop({type: String, required: true, enum: ['Draft', 'Published', 'Archived'], default: 'Draft'})
    status!: string;
    @Prop({type: String})
    thumbnail!: string;
    @Prop({ type: Types.ObjectId, ref: 'User',})
    userId?: Types.ObjectId;
    @Prop({type: Number, required: true})
    duration!: number;
    @Prop({type: [{ type: Types.ObjectId, ref: 'Chapter'}]})
    chapters!: Types.ObjectId[]
}

export const CourseSchema = SchemaFactory.createForClass(Course);