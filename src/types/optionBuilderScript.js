require("dotenv").config()
const tc = require("../utils/typeConstructor.js")
const c = require("../constants.js")
const sequentialize = require("../utils/sequentialize.js")

const puppeteer = require("puppeteer")


/**
    * Builds DTO objects from naturalist download options. 
    */
async function typeBuilder() {
    const [headers, properties] = await fetch()

    const asyncFuncs = []

    for (let i = 0; i < headers.length; i++) {
        asyncFuncs.push(async () => {
            tc.construct(headers[i], properties[i], false, "_types.js")
        })
    }

    await sequentialize(asyncFuncs, 0);

}

/**
    * @returns {[string[], string[]]} - Returns an array with of two arrays. The first array is the contains the headers. The second array contains the properties per header.
    */
async function fetch() {
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

        const entries = []
        const headers = []

        const fetchedHeaders = document.querySelectorAll("h4")
        fetchedHeaders.pop()

        extractHeader(fetchedHeaders);

        extractEntries(tables);

        function extractEntries(tables) {
            for (const node of tables) {
                entries.push(node?.innerText?.split(regex))
            }
        }

        function extractHeader(headers) {
            for (const h of headers) {
                headers.push(h?.innerText?.substring(0, h.indexOf(" (")));
            }
        }

        return [headers, entries]
    })

    return entries;
}
