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
            const data = JSON.parse(localStorage[key]);
            const dateNow = new Date();
            const dateTrip = new Date(data.form.date);
            let daysLeft = '';
            if (dateNow <= dateTrip) {
                const diffTime = Math.abs(dateTrip - dateNow);
                daysLeft = ` - ${Math.ceil(diffTime / (1000 * 60 * 60 * 24))} days away`;
            }
            store.push({
                key: key,
                value: {...data, daysLeft: daysLeft}
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
