import crypto from 'crypto';

const cryptsecret: string = '$2a$10$FhrJs/sxuxoaOPEaisSU9O0RMEUctF1T3BzTHXts.17AdAHZxFT0q';
const getAesKey = (): string => {
    return crypto.createHash('sha256').update(cryptsecret || '').digest('hex');
};
const aesEncrypt = (value: string, iv: Uint8Array): string | null => {
    try {
        const cipher: crypto.Cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(getAesKey(), 'hex'), iv);
        let encrypted: string = cipher.update(value, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    } catch (error) {
        return null;
    }
};
const aesDecrypt = (value: string, iv: Uint8Array): string | null => {
    try {
        const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(getAesKey(), 'hex'), iv);
        let decrypted: string = decipher.update(value, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    } catch (error) {
        return null;
    }
};
const aesCryptoTest = (value: string, iv: Uint8Array): boolean => {
    try {
        const decipher: crypto.Decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(getAesKey(), 'hex'), iv);
        decipher.update(value, 'hex', 'utf-8');

        return true;
    } catch (error) {
        return false;
    }
}

export { aesEncrypt, aesDecrypt, aesCryptoTest, getAesKey };
