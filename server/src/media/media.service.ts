import { Injectable, NotFoundException } from '@nestjs/common';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from 'config';
import { randomUUID } from 'crypto';
import { ConfirmUploadDto } from './DTO/confirmUploadDto';
import { InjectModel } from '@nestjs/mongoose';
import { Course } from 'src/course/schema/courseSchema';
import { Model } from 'mongoose';
import { CourseService } from 'src/course/course.service';
@Injectable()
export class MediaService {
    constructor(
        @InjectModel(Course.name) private readonly CourseModel: Model<Course>,
    ){}

    private s3 = new S3Client({
        region: 'auto',
        endpoint: config.get<string>('server.aws.END_POINT'),
        forcePathStyle: true,
        requestChecksumCalculation: 'WHEN_REQUIRED',
        responseChecksumValidation: 'WHEN_REQUIRED',
        credentials: {
            accessKeyId: config.get<string>('server.aws.ACCESS_KEY'),
            secretAccessKey: config.get<string>('server.aws.SECRET_KEY'),
        }
    })

    async createUploadUrl(originalName: string, contentType: string) {
        const fileKey = `${randomUUID()}-${originalName}`;
        const {url,fields} = await createPresignedPost(this.s3,{
            Bucket: config.get<string>('server.aws.BUCKET'),
            Key: fileKey,
            Conditions:[
                ['content-length-range', 0, 5 * 1024 * 1024],
                ['eq', '$Content-Type', contentType],
            ],
            Fields:{
                'Content-Type': contentType
            },
            Expires: 86400
        })
        return {url,fields,fileKey}
    }

    async completeUpload(confirmUploadDto: ConfirmUploadDto, JwtUserId: string){
        const course = await this.CourseModel.findOneAndUpdate({
            _id: confirmUploadDto.courseId,
            userId: JwtUserId
        },{
            $set:{fileKey: confirmUploadDto.fileKey}
        },{new: true})

        if(!course){
            throw new NotFoundException('course not found')
        }
        return { course }
    }



    async createViewUrl(fileKey: string){
        const command = new GetObjectCommand({
            Bucket: config.get<string>('server.aws.BUCKET'),
            Key: fileKey
        })
        const viewUrl = await getSignedUrl(this.s3,command,{expiresIn: 86400})
        return {viewUrl}
    }
}
