const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET;

// Pastikan bucket ada
async function initBucket() {
  try {
    const exists = await minioClient.bucketExists(bucketName);

    if (!exists) {
      await minioClient.makeBucket(bucketName, "us-east-1");
      console.log("Bucket created successfully");
    }

    await setBucketPublic();
  } catch (err) {
    console.error("MinIO Init Error:", err);
  }
}

async function setBucketPublic() {
  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };

  try {
    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log("Bucket is now public ✅");
  } catch (err) {
    console.error("Error setting bucket policy:", err);
  }
}

initBucket();

module.exports = minioClient;