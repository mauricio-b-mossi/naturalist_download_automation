const typeBuilderScript = require("../utils/typeBuilderScript.js")


async function run() {
    if (process.argv[2]) {
        await typeBuilderScript(process.argv[2])
    } else throw new Error("Provide filename for types.")
}

run()
