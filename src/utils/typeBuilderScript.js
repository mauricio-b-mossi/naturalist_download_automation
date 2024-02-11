require("dotenv").config()
const tc = require("./typeConstructor.js")
const c = require("../constants.js")
const sequentialize = require("./sequentialize.js")

const puppeteer = require("puppeteer")


/**
    * Builds DTO objects from naturalist download options. 
    */
module.exports = async function typeBuilder(filename) {
    const [headers, properties] = await fetchDtoComponents()

    const asyncFuncs = []

    // TODO: Using properties since we need to get rid of the extra header fetched.
    for (let i = 0; i < properties.length; i++) {
        asyncFuncs.push(async () => {
            tc.construct(headers[i], properties[i], false, filename)
        })
    }

    await sequentialize(asyncFuncs, 0);

}

/**
    * @returns {Promise<[string[], string[]]>} - Returns an array with of two arrays. The first array is the contains the headers. The second array contains the properties per header.
    */
async function fetchDtoComponents() {
    const browser = await puppeteer.launch({ headless: false })

    const page = await browser.newPage();

    await page.goto(c.naturalist);

    await page.waitForSelector("input.form-control.ui-autocomplete-input");

    await page.type("input.form-control.ui-autocomplete-input", c.demoTaxa);

    await page.waitForSelector("a.ac-view.view-observations");

    await page.click("a.ac-view.view-observations")

    await page.waitForSelector('button.btn.btn-default.dropdown-toggle[uib-tooltip="Filters"]')

    await page.click('button.btn.btn-default.dropdown-toggle[uib-tooltip="Filters"]')

    await page.waitForSelector("div.row#filters-footer a.btn.btn-link i.fa.fa-download")

    await page.click("div.row#filters-footer a.btn.btn-link i.fa.fa-download")

    await page.waitForSelector("input#user_email")

    await page.type("input#user_email", process.env.USER ?? "emailscraping47@gmail.com")

    await page.waitForSelector("input#user_password")

    await page.type("input#user_password", process.env.PASSWORD ?? "emailScraping47")

    await page.waitForSelector('input[type="submit"][name="commit"]')

    await page.click('input[type="submit"][name="commit"]')

    await page.waitForSelector("h4 ~table")


    const entries = await page.$$eval("h4 ~table:has(td):has([id*='_'])", (tables) => {

        const regex = /\W*\n+\t*\n\W*/

        const entriesArr = []
        const headersArr = []

        const fetchedHeaders = document.querySelectorAll("h4")

        extractHeader(fetchedHeaders);

        extractEntries(tables);

        function extractEntries(tables) {
            for (const node of tables) {
                entriesArr.push(node?.innerText?.split(regex))
            }
        }

        function extractHeader(headers) {
            for (const h of headers) {
                headersArr.push(h?.innerText?.substring(0, h?.innerText?.indexOf(" (")));
            }
        }

        return [headersArr, entriesArr]
    })

    await browser.close()

    return entries;
}
