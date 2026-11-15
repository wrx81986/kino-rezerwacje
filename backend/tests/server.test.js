
const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../server');

test('API odpowiada poprawnie na żądania HTTP', async (t) => {
    const server = app.listen(0);

    await new Promise((resolve) => server.once('listening', resolve));

    t.after(() => new Promise((resolve, reject) => {
        server.close((error) => {
            if (error) reject(error);
            else resolve();
        });
    }));

    const address = server.address();
    const baseUrl = `http://127.0.0.1:${address.port}`;

    await t.test('GET / zwraca status 200', async () => {
        const response = await fetch(`${baseUrl}/`);

        assert.equal(response.status, 200);

        const data = await response.json();

        assert.equal(data.message, 'Cinema API działa poprawnie!');
    });

    await t.test('Nieznany adres zwraca status 404', async () => {
        const response = await fetch(`${baseUrl}/nieistniejacy-adres`);

        assert.equal(response.status, 404);

        const data = await response.json();

        assert.equal(data.error, 'Nie znaleziono takiego adresu API');
    });
});
