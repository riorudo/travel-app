const formHandler = require('./formHandler');

test('Check query param chain method', () => {
    expect(formHandler.chainGetQueryParams({key: 1234, param: 'London'})).toBe('?key=1234&param=London');
});
