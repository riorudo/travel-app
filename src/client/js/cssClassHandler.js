function addClass(elem, className) {
    if (elem && !elem.classList.contains(className)) {
        elem.classList.add(className);
    }
}

function removeClass(elem, className) {
    if (elem && elem.classList.contains(className)) {
        elem.classList.remove(className);
    }
}

export {addClass};
export {removeClass};
