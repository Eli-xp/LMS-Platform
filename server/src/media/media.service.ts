import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from 'config';
import { randomUUID } from 'crypto';
@Injectable()
export class MediaService {
    private s3 = new S3Client({
        region: 'default',
        endpoint: config.get<string>('server.aws.END_POINT'),
        credentials: {
            accessKeyId: config.get<string>('server.aws.ACCESS_KEY'),
            secretAccessKey: config.get<string>('server.aws.SECRET_KEY'),
        }
    })


    async createUploadUrl(originalName: string, contentType: string) {
        const command = new GetObjectCommand({
            Bucket: config.get<string>('server.aws.BUCKET'),
            Key: originalName,
        })

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 3600 })
        return {uploadUrl}
    }
}
