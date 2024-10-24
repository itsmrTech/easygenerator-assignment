import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
import { DateTime } from 'luxon';

const scryptAsync = promisify(scrypt);

/**
 * Generates a hashed password using the scrypt algorithm.
 *
 * This function takes a plain text password and generates a secure hash
 * using the scrypt key derivation function. It also generates a random
 * salt to ensure that the same password will produce different hashes
 * each time it is hashed.
 *
 * @param password - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password concatenated with the salt.
 */
export const generatePasswordHash = async (
    password: string
): Promise<string> => {
    const salt = randomBytes(16).toString('hex');
    const keyLength = 32; // The length of the derived key in bytes. 32 bytes is a good length for our use case

    const hash = (await scryptAsync(password, salt, keyLength)) as Buffer;
    return `${hash.toString('hex')}:${salt}`;
};

export const comparePasswordHash = async (
    password: string,
    hash: string
): Promise<boolean> => {
    const [hashedPassword, salt] = hash.split(':');
    const keyLength = 32;

    const hashBuffer = (await scryptAsync(password, salt, keyLength)) as Buffer;
    return hashBuffer.toString('hex') === hashedPassword;
};

/**
 *
 * @param duration  could be 1d, 1h, 1m, 1s
 * @returns {number} timestamp
 */
export const calculateExpirationDate = (duration: string) => {
    const date = DateTime.now();

    const durationUnit = duration.slice(-1);
    const durationValue = parseInt(duration.slice(0, -1));
    switch (durationUnit) {
        case 'd':
            return date.plus({ days: durationValue }).toMillis();
        case 'h':
            return date.plus({ hours: durationValue }).toMillis();
        case 'm':
            return date.plus({ minutes: durationValue }).toMillis();
        case 's':
            return date.plus({ seconds: durationValue }).toMillis();
        default:
            throw new Error('Invalid duration unit');
    }
};
