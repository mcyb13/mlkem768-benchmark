import { ml_kem768 } from '@noble/post-quantum/ml-kem.js';
import crypto from 'crypto';

console.log("=== ML-KEM-768 Performance Benchmark ===\n");

// 1️⃣ Alice generates keypair
const startKeygen = performance.now();
const aliceKeys = ml_kem768.keygen();
const endKeygen = performance.now();

console.log("✅ Alice generated keypair");
console.log("   Public Key Size:", aliceKeys.publicKey.length, "bytes");
console.log("   Secret Key Size:", aliceKeys.secretKey.length, "bytes");
console.log("   ⏱️  KeyGen Time:", (endKeygen - startKeygen).toFixed(2), "ms");
console.log();

// 2️⃣ Bob encapsulates
const startEncap = performance.now();
const { cipherText, sharedSecret: bobSecret } =
  ml_kem768.encapsulate(aliceKeys.publicKey);
const endEncap = performance.now();

console.log("✅ Bob encapsulated shared secret");
console.log("   Ciphertext Size:", cipherText.length, "bytes");
console.log("   Shared Secret Size:", bobSecret.length, "bytes");
console.log("   ⏱️  Encapsulation Time:", (endEncap - startEncap).toFixed(2), "ms");
console.log();

// 3️⃣ Alice decapsulates
const startDecap = performance.now();
const aliceSecret =
  ml_kem768.decapsulate(cipherText, aliceKeys.secretKey);
const endDecap = performance.now();

console.log("✅ Alice decapsulated shared secret");
console.log("   ⏱️  Decapsulation Time:", (endDecap - startDecap).toFixed(2), "ms");
console.log();

// 4️⃣ Verify both have the same secret
console.log("=== Verification ===\n");
const isMatch = Buffer.compare(Buffer.from(bobSecret), Buffer.from(aliceSecret)) === 0;
console.log("Shared secret match:", isMatch);
console.log();

// 5️⃣ Derive AES key and encrypt
console.log("=== Encryption ===\n");

const startAES = performance.now();
const key = crypto.createHash('sha256')
  .update(Buffer.from(bobSecret))
  .digest();

const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update("Post-Quantum Secure Message", 'utf8', 'hex');
encrypted += cipher.final('hex');
const endAES = performance.now();

console.log("Encrypted:", encrypted);
console.log("⏱️  AES Encryption Time:", (endAES - startAES).toFixed(2), "ms");
console.log();

// 6️⃣ Summary
console.log("=== Performance Summary ===\n");
const totalTime = endAES - startKeygen;
console.log("Total Time:", totalTime.toFixed(2), "ms");
console.log();
console.log("Breakdown:");
console.log("  KeyGen:        ", (endKeygen - startKeygen).toFixed(2), "ms", 
            `(${((endKeygen - startKeygen) / totalTime * 100).toFixed(1)}%)`);
console.log("  Encapsulation: ", (endEncap - startEncap).toFixed(2), "ms",
            `(${((endEncap - startEncap) / totalTime * 100).toFixed(1)}%)`);
console.log("  Decapsulation: ", (endDecap - startDecap).toFixed(2), "ms",
            `(${((endDecap - startDecap) / totalTime * 100).toFixed(1)}%)`);
console.log("  AES Encryption:", (endAES - startAES).toFixed(2), "ms",
            `(${((endAES - startAES) / totalTime * 100).toFixed(1)}%)`);