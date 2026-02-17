# mlkem768-benchmark

A comprehensive performance benchmark and demonstration of post-quantum key encapsulation using ML-KEM-768 (formerly Kyber-768) with detailed timing analysis and size measurements.

[![NIST Standard](https://img.shields.io/badge/NIST-FIPS%20203-blue)](https://csrc.nist.gov/pubs/fips/203/final)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.19.0-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 What This Benchmark Does

This program demonstrates **post-quantum cryptography** with comprehensive **performance benchmarking**. It shows:

- ✅ How two parties establish a shared secret without transmitting it
- ✅ Microsecond-precision timing for each cryptographic operation
- ✅ Size analysis of all keys and data structures
- ✅ Real-world encryption using the shared secret
- ✅ Verification that quantum-resistant key exchange works correctly

## 🚀 Quick Start

### Prerequisites
- Node.js v20.19.0 or higher
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mlkem768-benchmark.git
cd mlkem768-benchmark

# Install dependencies
npm install
```

### Run the Benchmark

```bash
node mlkem768-benchmark.js
```

## 📊 Sample Output

```
=== ML-KEM-768 Performance Benchmark ===

✅ Alice generated keypair
   Public Key Size: 1184 bytes
   Secret Key Size: 2400 bytes
   ⏱️  KeyGen Time: 2.45 ms

✅ Bob encapsulated shared secret
   Ciphertext Size: 1088 bytes
   Shared Secret Size: 32 bytes
   ⏱️  Encapsulation Time: 1.32 ms

✅ Alice decapsulated shared secret
   ⏱️  Decapsulation Time: 1.18 ms

=== Verification ===

Shared secret match: true

=== Encryption ===

Encrypted: a3f8d9e2c1b7...
⏱️  AES Encryption Time: 0.15 ms

=== Performance Summary ===

Total Time: 5.10 ms

Breakdown:
  KeyGen:         2.45 ms (48.0%)
  Encapsulation:  1.32 ms (25.9%)
  Decapsulation:  1.18 ms (23.1%)
  AES Encryption: 0.15 ms (2.9%)
```

## 🔬 How It Works

### Step 1: Key Generation
```javascript
const aliceKeys = ml_kem768.keygen();
```
Alice generates a public key (1,184 bytes) and secret key (2,400 bytes).

### Step 2: Encapsulation
```javascript
const { ciphertext, sharedSecret: bobSecret } = 
  ml_kem768.encapsulate(aliceKeys.publicKey);
```
Bob creates a random 32-byte shared secret and encrypts it using Alice's public key, producing a 1,088-byte ciphertext.

### Step 3: Decapsulation
```javascript
const aliceSecret = 
  ml_kem768.decapsulate(ciphertext, aliceKeys.secretKey);
```
Alice uses her secret key to extract the same shared secret from the ciphertext.

### Step 4: Verification
Both parties verify they have identical secrets.

### Step 5: Encryption
The shared secret is used to derive an AES-256 key for encrypting actual messages.

## 📈 Performance Analysis

| Operation | Time | % of Total | Description |
|-----------|------|------------|-------------|
| **KeyGen** | ~2.5ms | 48% | One-time cost per session |
| **Encapsulation** | ~1.3ms | 26% | Bob's operation |
| **Decapsulation** | ~1.2ms | 23% | Alice's operation |
| **AES Encryption** | ~0.15ms | 3% | Symmetric encryption |
| **Total** | ~5ms | 100% | Complete handshake |

### Key Insights

- **Under 10ms Total**: Fast enough for real-time applications
- **Key Generation Dominates**: 48% of time, but done once per session
- **Core Operations are Fast**: Encap/Decap take only 1-2ms each
- **AES is Nearly Free**: Symmetric encryption adds minimal overhead

## 🔐 Technical Specifications

| Parameter | Value |
|-----------|-------|
| **Algorithm** | ML-KEM-768 (NIST FIPS 203) |
| **Security Level** | NIST Level 3 (≈ AES-192) |
| **Public Key** | 1,184 bytes |
| **Secret Key** | 2,400 bytes |
| **Ciphertext** | 1,088 bytes |
| **Shared Secret** | 32 bytes |

## 📦 Project Structure

```
mlkem768-benchmark/
├── mlkem768-benchmark.js        # Main benchmark program
├── package.json                 # Dependencies
├── package-lock.json            # Dependency lock file
├── README.md                    # This file
└── .gitignore                   # Git ignore rules
```

## 💡 Why Post-Quantum Cryptography?

### The Quantum Threat
Current encryption methods (RSA, ECDH) will be **broken by quantum computers** using Shor's algorithm. Organizations need to transition now to protect:

- Long-term sensitive data
- Financial transactions
- Government communications
- Healthcare records
- Intellectual property

### The Solution: ML-KEM
ML-KEM is based on the **Learning With Errors (LWE)** problem on lattices, which remains hard even for quantum computers. It's part of the **NIST Post-Quantum Cryptography Standards** released in 2024.

## 🌍 Real-World Applications

ML-KEM will be integrated into:

- **TLS 1.3** - Secure web browsing (HTTPS)
- **VPNs** - Virtual private networks
- **Signal Protocol** - Secure messaging
- **SSH** - Secure shell connections
- **IPsec** - Network layer security
- **Blockchain** - Cryptocurrency wallets

## 🛠️ Code Features

### Performance Benchmarking
Uses `performance.now()` for microsecond-precision timing of all operations.

### Size Analysis
Logs the byte size of all cryptographic artifacts (keys, ciphertext, secrets).

### Complete Workflow
Demonstrates the entire key encapsulation flow from key generation to message encryption.

### Production-Ready
Uses the official `@noble/post-quantum` implementation with NIST-standardized algorithms.

## 📚 Learn More

- **NIST PQC Project**: [https://csrc.nist.gov/projects/post-quantum-cryptography](https://csrc.nist.gov/projects/post-quantum-cryptography)
- **ML-KEM Standard (FIPS 203)**: [https://csrc.nist.gov/pubs/fips/203/final](https://csrc.nist.gov/pubs/fips/203/final)
- **@noble/post-quantum**: [https://github.com/paulmillr/noble-post-quantum](https://github.com/paulmillr/noble-post-quantum)
- **Lattice Cryptography**: [https://en.wikipedia.org/wiki/Lattice-based_cryptography](https://en.wikipedia.org/wiki/Lattice-based_cryptography)

## 🔧 Troubleshooting

### Import Error: 'ml_kem768' not found

**Problem**: Older versions used different export names.

**Solution**: Make sure you're using version 0.5.4+ and importing from `/ml-kem.js`:
```javascript
// ✅ Correct (v0.5.4+)
import { ml_kem768 } from '@noble/post-quantum/ml-kem.js';

// ❌ Old (pre-v0.5.4)
import { kyber768 } from '@noble/post-quantum/kyber.js';
```

### Node Version Error

**Problem**: Package requires Node.js >= 20.19.0

**Solution**: Update Node.js:
```bash
# Using nvm
nvm install 20
nvm use 20

# Or download from nodejs.org
```

### 'ciphertext' is undefined

**Problem**: Destructuring error with encapsulate result.

**Solution**: Verify your @noble/post-quantum version:
```bash
npm list @noble/post-quantum
# Should show version 0.5.4 or higher
```

## 🤝 Contributing

Contributions are welcome! Areas for improvement:

- Additional security level comparisons (512, 768, 1024)
- Comparison with classical key exchange (ECDH, RSA)
- Browser-based demo with Web Crypto API
- Performance testing across different platforms
- Integration examples with real protocols

## 📄 License

MIT License - Free for commercial and personal use.

## ⭐ Acknowledgments

- **NIST** for standardizing post-quantum cryptography
- **Paul Miller** (@paulmillr) for the @noble/post-quantum library
- **The PQC Community** for advancing quantum-resistant algorithms

## 📞 Support

Having issues? Please:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [existing issues](https://github.com/yourusername/mlkem768-benchmark/issues)
3. Open a new issue with:
   - Node.js version (`node --version`)
   - Package version (`npm list @noble/post-quantum`)
   - Complete error message
   - Steps to reproduce

---

**⚠️ Note**: This is a demonstration for educational and benchmarking purposes. For production use, ensure proper:
- Key management and storage
- Secure random number generation
- Authentication mechanisms
- Side-channel attack mitigation
- Compliance with security standards

**Ready to secure your applications against quantum computers? Star this repo and start experimenting! ⭐**
