export const StorageConfig = {
    video: {
        destination: '../storage/video/',
        urlPrefix: '/assets/videos/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dana,
        maxSize: 1024 * 1024 * 3 // u bajtovima = 3MB
    }
};