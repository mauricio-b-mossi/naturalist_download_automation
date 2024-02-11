const puppeteer = require("puppeteer")

const item = "mangroove skipper"
const email = "emailscraping47@gmail.com"
const pwd = "emailScraping47"

async function main() {

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://www.inaturalist.org/");

    await page.waitForSelector("input.form-control.ui-autocomplete-input");

    await page.type("input.form-control.ui-autocomplete-input", item);

    await page.waitForSelector("a.ac-view.view-observations");

    await page.click("a.ac-view.view-observations")

    await page.waitForSelector('button.btn.btn-default.dropdown-toggle[uib-tooltip="Filters"]')

    await page.click('button.btn.btn-default.dropdown-toggle[uib-tooltip="Filters"]')

    await page.waitForSelector("div.row#filters-footer a.btn.btn-link i.fa.fa-download")

    await page.click("div.row#filters-footer a.btn.btn-link i.fa.fa-download")

    await page.waitForSelector("input#user_email")

    await page.type("input#user_email", email)

    await page.waitForSelector("input#user_password")

    await page.type("input#user_password", pwd)

    await page.waitForSelector('input[type="submit"][name="commit"]')

    await page.click('input[type="submit"][name="commit"]')

    await page.waitForSelector("span.meta a:last-child")

    // Clearing all the fields.
    await page.$$eval("span.meta a:last-child", (els) => {
        for (let el of els) {
            el.click()
        }
    })

    // Can either do by individual items or cols.

}

main();
