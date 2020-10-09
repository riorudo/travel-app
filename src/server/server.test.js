const server = require('./server');

test('Format Date for API', () => {
    expect(server.formatDateForAPI('2020-10-12')).toBe('10-12');
});
