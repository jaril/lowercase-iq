import Puppeteer from "puppeteer";

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

export default async function getTsmc() {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();

  // Pretend we're headed so we don't get Access Denied
  await page.setUserAgent(USER_AGENT);

  await page.goto('https://investor.tsmc.com/english/financial-calendar');

  const dateTime = await page.evaluate(() => {
    const texts = [...document.querySelectorAll(".item-text")];
    // TSMC typically labels their earnings as `TSMC QQYY Results - Earnings Conference and Conference Call`
    const earningsText = texts.find(elem => elem.innerHTML.toLowerCase().includes("earnings conference"));

    if (!earningsText) {
      return null;
    }

    const earningsRow = earningsText.closest(".item");

    return earningsRow.querySelector(".datetime").innerHTML;
  });

  await browser.close();

  return dateTime;
};
