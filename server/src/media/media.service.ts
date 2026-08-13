import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from 'config';
import { randomUUID } from 'crypto';
@Injectable()
export class MediaService {
    private s3 = new S3Client({
        region: 'auto',
        endpoint: config.get<string>('server.aws.END_POINT'),
        forcePathStyle: true,
        credentials: {
            accessKeyId: 'lJCUrcjns3muaDsY',
            secretAccessKey: 'LkmtljMpifWMOIWn9LD1eWuCeBcn5bbU',
        }
    })


    async createUploadUrl(originalName: string, contentType: string) {
        const fileKey = `${randomUUID()}-${originalName}`;
        const command = new PutObjectCommand({
            Bucket: 'c917408',
            Key: fileKey,
            ContentType: `${contentType}`
        })

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 })
        return {uploadUrl,fileKey}
    }
}
