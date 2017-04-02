const network = require("./network.js");

const templates = {};

function _load(path) {
    return network.request("GET", path).then(r => {
        const renderer = eval("var renderer = " + r + "; renderer");
        return renderer;
    });
}

export function load(path) {
    if(typeof(path) != "string") {
        throw new Error("Expecting a string for path.");
    }

    return new Promise((cb, reject) => {
        if(templates[path]) cb(templates[path]);
        else {
            _load(path).then(r => {
                templates[path] = r;
                cb(r);
            }).catch(e => reject(e));
        }
    });
}

export function render(path, target, params) {
    if(!(target instanceof HTMLElement)) {
        throw new Error("Target is not an HTML element.");
    }

    return load(path).then(r => {
        target.innerHTML = r(params);
    });
}
