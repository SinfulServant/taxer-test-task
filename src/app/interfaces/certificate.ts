interface Certificate {
    tbsCertificate: {
        version: number // always 2
        serialNumber: number
        signature: string | number
        issure: {
            countryName: string
            organizationName: string
            serialNumber: string
            stateOrProvinceName?: string
            localityName: string
            commonName: string
            organizationalUnitName: string
        }
        validity: {
            notBefore: string | Date
            notAfter: string | Date
        }
        subject: {
            countryName: string
            commonName: string
            surname?: string
            givenName?: string
            serialNumber: string
            organizationName?: string
            organizationalUnitName?: string
            stateOrProvinceName?: string
            localityName: string
            title?: string
        }
        subjectPublicKeyInfo: {
            algorithm: {
                algorithm: string | number
                parameters: string | any
            }
            subjectPublicKey: string
        }
        extentions: {
            authorityKeyIdentifier: {}
            subjectKeyIdentifier: {}
            keyUsage: {}
            extKeyUsage?: {}
            certificatePolicies: {}
            subjectAltName?: {}
            issuerAlternativeName?: {}
            basicConstraints?: {}
            subjectDirectoryAttributes?: {}
            cRLDistributionPoints: {}
            freshestCRL?: {}
            qcStatements?: {}
            privateKeyUsagePeriod: {}
            authorityInfoAccess: {}
            subjectInfoAccess: {}
        }
    }
    signatureAlgorithm: string | number
    signatureValue: string
}