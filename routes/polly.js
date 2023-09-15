const AWS = require('aws-sdk');
require('dotenv').config();

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_IDD,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEYY,
  region: process.env.AWS_REGIONN,
});

const polly = new AWS.Polly();

async function generatePollyAudio(text) {
  try {
    const params = {
      Text: text,
      OutputFormat: 'mp3', // Choose an appropriate output format
      VoiceId: 'Joanna', // Choose a voice (e.g., Joanna)
    };

    const data = await polly.synthesizeSpeech(params).promise();

    if (data.AudioStream instanceof Buffer) {
      // Implement logic to save or process the audio data if needed

      // Assuming you have an S3 bucket set up, you can upload the audio data
      const s3 = new AWS.S3();
      const s3BucketName = 'ziphoblogbucket';
      const s3Key = 'audio.mp3'; // Choose a key for your audio file in S3

      const uploadParams = {
        Bucket: s3BucketName,
        Key: s3Key,
        Body: data.AudioStream,
      };

      await s3.upload(uploadParams).promise();

      // Return the URL of the uploaded audio file
      const audioUrl = `https://${s3BucketName}.s3.amazonaws.com/${s3Key}`;
      return audioUrl;
    } else {
      console.error('Polly did not return valid audio data');
      throw new Error('Polly did not return valid audio data');
    }
  } catch (error) {
    console.error('Error generating Polly audio:', error);
    throw error;
  }
}

module.exports = { generatePollyAudio };