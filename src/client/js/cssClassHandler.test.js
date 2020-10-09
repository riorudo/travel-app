const cssClassHandler = require('./cssClassHandler');

document.body.innerHTML = `<div id="testBox" class="class-to-be-removed"></div>`;
const testBox = document.getElementById('testBox');
const classToAdd = 'test-class';
const classToBeRemoved = 'class-to-be-removed';

test('Add class to elem', () => {
    cssClassHandler.addClass(testBox, classToAdd);
    expect(testBox.classList.contains(classToAdd)).toBe(true);
});

test('Remove class for elem', () => {
    cssClassHandler.removeClass(testBox, classToBeRemoved);
    expect(testBox.classList.contains(classToBeRemoved)).toBe(false);
});
