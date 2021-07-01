module.exports = {
    mongoURI: 'mongodb://localhost/web-push', //
    privateKey: process.env.VAPID_PRIVATE_KEY,
    publicKey: process.env.VAPID_PUBLIC_KEY
}