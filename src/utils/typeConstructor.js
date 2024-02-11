const fs = require("node:fs/promises")
const path = require("node:path")

/**
    * @param {string} typeName - Name of resulting type.
    * @param {string[]} properties - Properties of resulting type.
    * @param {any} defaultValue - Default value of properties. If not specified, defaults to null.
    * @param {string} filePath - Relative path from project directory pointing to desination of file.
  */
module.exports.construct = async function(typeName, properties, defaultValue = null, filePath) {

    console.log(__dirname, path.dirname(__dirname))

    const file = await fs.open(path.join(path.dirname(__dirname), filePath), "a");

    typeName = typeName.replace(" ", "_")

    let str = `const ${typeName} = {\n\t`;

    // create huge string to append.
    for (let i = 0; i < properties.length; i++) {

        const prop = properties[i];

        if (i != properties.length - 1) {
            str += `${prop}: ${defaultValue},\n\t`
        }
        else {
            str += `${prop}: ${defaultValue}\n}\n\n`
        }
    }

    await file.appendFile(str)

    await file.close();

}
