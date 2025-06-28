const base64 = new Base64();

QUnit.module('Base64', (hooks) => {
    QUnit.test('encoder', (assert) => {
        assert.equal(base64.encode('Петрику'), '0J/QtdGC0YDQuNC60YM='); 
        assert.equal(base64.encode('Мій логін є: !@#$%^&*продт'), '0JzRltC5INC70L7Qs9GW0L0g0ZQ6ICFAIyQlXiYq0L/RgNC+0LTRgg==');
        assert.equal(base64.encode(''), ''); 
    });

     QUnit.test('decoder', (assert) => {
        assert.equal(base64.decode('8J+QlPCfpZo'), '🐔🥚'); 
        assert.equal(base64.decode(''), ''); 
    });

    QUnit.test('encoder', (assert) => {
        assert.equal(base64.encodeUrl('Петрику'), '0J_QtdGC0YDQuNC60YM'); 
        assert.equal(base64.encodeUrl('Мій логін є: !@#$%^&*продт'), '0JzRltC5INC70L7Qs9GW0L0g0ZQ6ICFAIyQlXiYq0L_RgNC-0LTRgg');
        assert.equal(base64.encodeUrl(''), ''); 
    });

     QUnit.test('decoder', (assert) => {
        assert.equal(base64.decodeUrl('8J-QlPCfpZo'), '🐔🥚'); 
        assert.equal(base64.decodeUrl(''), ''); 
    });

    QUnit.test('jwt decoder', (assert) => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBenVyZVB2MzExIiwic3ViIjoiMzJkMGY2MDItOGZmZS00NmM2LWEwZDItYzU5ZGY1ZDllZDQ1IiwiYXVkIjoiU2VsZlJlZ2lzdGVyZWQiLCJpYXQiOjE3NTA3NzcyODIzLCJleHAiOjE3NTA3NzczMTIzLCJuaWQiOiJqYyIsIm5hbSI6ItCf0LXRgNGC0LjQutGDINCfJ9GP0YLQvtGH0LrRltC9In0.86eAgeEcQBQGsoBj4ubFoFTINLDEt4UEK9R4k0A5pjY";
    var payload = base64.jwtDecodePayload(token);
    console.log(payload);
    

    // aud: "SelfRegistered"
    // exp: 17507773123
    // iat: 17507772823
    // iss: "AzurePv311"
    // nam: "Пертику П'яточкін"
    // nid: "jc"
    // sub: "32d0f602-8ffe-46c6-a0d2-c59df5d9ed45"
    assert.equal(payload.nam, "Пертику П'яточкін");
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJBenVyZVB2MzExIiwic3ViIjoiMzJkMGY2MDItOGZmZS00NmM2LWEwZDItYzU5ZGY1ZDllZDQ1IiwiYXVkIjoiU2VsZlJlZ2lzdGVyZWQiLCJpYXQiOjE3NTA3NzcyODIzLCJleHAiOjE3NTA3NzczMTIzLCJuaWQiOiJqYyIsIm5hbSI6ItCf0LXRgNGC0LjQutGDINCfJ9GP0YLQvtGH0LrRltC9In0/.86eAgeEcQBQGsoBj4ubFoFTINLDEt4UEK9R4k0A5pjY";
    assert.throws(() => base64.jwtDecodePayload(token));
    });

    QUnit.test('JWT encoder', (assert => {
        const header = { "alg": "HS256", "typ": "JWT" };
        const payload = { "loggedInAs": "admin", "iat": 1422779638 };
        var jwt = base64.jwtEncodeBody(header,payload);
        assert.equal(jwt, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9");
    }));

    // Тест 1 звичайний тест
    QUnit.test("Кодування простих даних", (assert) => {
        const encoded = base64.generateAuthToken("testUser", "testPass123");
        assert.equal(encoded, "dGVzdFVzZXI6dGVzdFBhc3MxMjM=");
    });

    // Тест 2 з моїми данними
    QUnit.test("Мої дані", (assert) => {
        const encoded = base64.generateAuthToken("Yusypiv Olexandr", "SecureP@ss2023!");
        assert.equal(encoded, "WXVzeXBpdiBPbGV4YW5kcjpTZWN1cmVQQHNzMjAyMyE=");

        const decoded = base64.parseAuthToken("WXVzeXBpdiBPbGV4YW5kcjpTZWN1cmVQQHNzMjAyMyE=");
        assert.equal(decoded.username, "Yusypiv Olexandr");
        assert.equal(decoded.passphrase, "SecureP@ss2023!");
    });
});