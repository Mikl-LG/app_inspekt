import * as crypt from "crypto"
/**
 * 
 * @param {*} str 
 * @notice Will provide equivalent results as expo-crypto digestStringAsync method
 */
export const hasher = (str) => {
    return new Promise((resolve) => {
        const hash = crypt.createHash('sha256');
        hash.on('readable', () => {
            const data = hash.read();
            if (data) {
                //console.log(data.toString('hex'));
                resolve(data.toString('hex'))
            }
        });
        hash.write(str);
        hash.end();
    })
}