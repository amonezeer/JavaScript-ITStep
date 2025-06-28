class Base64 {
    static #textEncoder = new TextEncoder();
    static #textDecoder = new TextDecoder();

    // https://datatracker.ietf.org/doc/html/rfc4648#section-4
    encode = (str) => btoa(String.fromCharCode(...Base64.#textEncoder.encode(str)));
    decode = (str) => Base64.#textDecoder.decode(Uint8Array.from(atob(str), c => c.charCodeAt(0)));
    
    // https://datatracker.ietf.org/doc/html/rfc4648#section-5
    encodeUrl = (str) => this.encode(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    decodeUrl = (str) => this.decode(str.replace(/\-/g, '+').replace(/\_/g, '/'));

    jwtEncodeBody = (header, payload) => this.encodeUrl(JSON.stringify(header)) +'.' + this.encodeUrl(JSON.stringify(payload));
    jwtDecodePayload = (jwt) => JSON.parse(this.decodeUrl(jwt.split('.')[1]));

    // RFC7617
    generateAuthToken = (username, passphrase) => {
        if (username.includes(':')) {
            throw new Error("Ім'я користувача не може містити двокрапку");
        }
        return this.encode(`${username}:${passphrase}`);
    };

    parseAuthToken = (encodedToken) => {
        const decoded = this.decode(encodedToken);
        const separatorPosition = decoded.indexOf(':');
        
        if (separatorPosition === -1) {
            throw new Error("Невірний формат даних — відсутня двокрапка");
        }
        
        return {
            username: decoded.substring(0, separatorPosition),
            passphrase: decoded.substring(separatorPosition + 1)
        };
    };

    createAuthHeader = (user, pass) => `Basic ${this.generateAuthToken(user, pass)}`;
    
    extractFromAuthHeader = (authString) => {
        if (!authString.startsWith('Basic ')) {
            throw new Error("Невірний формат Basic заголовка");
        }
        return this.parseAuthToken(authString.substring(6));
    };
}
