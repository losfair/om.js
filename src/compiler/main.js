const OxygenMark = require("oxygenmark");
const fs = require("fs");

export function compile(code) {
    const ctx = new OxygenMark();

    ctx.loadFile(process.argv[2]);
    const tpl = ctx.prepareRaw();

    ctx.destroy();

    return tpl;
}

export function compileFile(input, output) {
    const code = fs.readFileSync(input);
    const target = compile(code);

    if(output) {
        fs.writeFileSync(output, target);
    }

    return target;
}
