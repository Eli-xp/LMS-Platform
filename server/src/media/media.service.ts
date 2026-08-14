import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from 'config';
import { randomUUID } from 'crypto';
@Injectable()
export class MediaService {

    // ست کردن مشخصات اتصال برای ساخت کلاینت اس 3
    private s3 = new S3Client({
        region: 'auto',
        endpoint: 'https://c917408.parspack.net/',
        forcePathStyle: true,
        credentials: {
            accessKeyId: 'lJCUrcjns3muaDsY',
            secretAccessKey: 'LkmtljMpifWMOIWn9LD1eWuCeBcn5bbU',
        }
    })

    // فانکشن ساخت نام فایل و اسم باکت
    async createUploadUrl(originalName: string, contentType: string) {
        const fileKey = `${randomUUID()}-${originalName}`;
        const command = new PutObjectCommand({
            Bucket: 'c917408',
            Key: fileKey,
            ContentType: `${contentType}`
        })
        // دریافت لینک آپلود
        const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 300 })
        return {uploadUrl,fileKey}
    }
}
