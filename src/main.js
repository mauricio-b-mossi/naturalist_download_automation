const tc = require("./utils/typeConstructor.js")

async function main() {
    const ob = {
        name: 20,
        age: 20,
        nationality: "",
        job: "",
        height: "",
        weight: ""
    }

    await tc.construct("Person", Object.getOwnPropertyNames(ob), null, "person.js")
}

main()
