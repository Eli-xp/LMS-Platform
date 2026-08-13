import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from 'config';
import { randomUUID } from 'crypto';
@Injectable()
export class MediaService {
    private s3 = new S3Client({
        region: 'default',
        endpoint: config.get<string>('server.aws.END_POINT'),
        forcePathStyle: true,
        credentials: {
            accessKeyId: 'lJCUrcjns3muaDsY',
            secretAccessKey: 'LkmtljMpifWMOIWn9LD1eWuCeBcn5bbU',
        }
    })


    async createUploadUrl() {
        const fileKey = `Assets/tataloo.png`;
        const command = new PutObjectCommand({
            Bucket: config.get<string>('server.aws.BUCKET'),
            Key: fileKey,
            ContentType: 'image/png',
            ACL: 'bucket-owner-full-control',
        })

        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 })
        return {uploadUrl,fileKey}
    }
}
