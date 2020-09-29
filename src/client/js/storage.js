const ls = require('local-storage');

function setItem(key, value) {
    ls.set(key, value);
};

function updateItem(key, value) {
    ls.set(key, value);
};

function getItem(key) {
    ls.get(key);
};

function getAllItems() {
    const store = [];
    Object.keys(localStorage).forEach(key => {
        // Filter out property on dev
        if (key !== 'loglevel:webpack-dev-server') {
            store.push({
                key: key,
                value: JSON.parse(localStorage[key])
            })
        }
    });
    return store;
}

function deleteItem(key) {
    ls.remove(key);
}

function clear() {
    ls.clear();
}

export {setItem};
export {updateItem};
export {getItem};
export {deleteItem};
export {clear};
export {getAllItems};
