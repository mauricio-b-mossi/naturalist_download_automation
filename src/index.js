require("dotenv").config()

const c = require("./constants.js")

const puppeteer = require("puppeteer")

async function main() {

    console.log(process.env.USER)
    console.log(process.env.PASSWORD)

    const browser = await puppeteer.launch({ headless: false });
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

    await page.type("input#user_email", process.env.USER)

    await page.waitForSelector("input#user_password")

    await page.type("input#user_password", process.env.PASSWORD)

    await page.waitForSelector('input[type="submit"][name="commit"]')

    await page.click('input[type="submit"][name="commit"]')

    await page.waitForSelector("span.meta a:last-child")

    // Clearing all the fields.
    await page.$$eval("span.meta a:last-child", (els) => {
        for (let el of els) {
            el.click()
        }
    })

    /* 1. Continue to select the columns 
    *  2. Set Date Interval.
    *  3. Download.
    *  4. Repeat.
    *  5. Implement Error Hanlding Like Email When Service Crashes.
    */

}

main();
