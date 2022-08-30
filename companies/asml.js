import Puppeteer from "puppeteer";
import { format } from "date-fns";

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

function getDate() {
  const texts = [...document.querySelectorAll("#app > section > div > div > div > div > div > div > div > div > h5")];
  // ASML typically labels their earnings as `Q3 2022 financial results`
  const earningsText = texts.find(elem => elem.innerHTML.toLowerCase().includes("financial results"));

  if (!earningsText) {
    return null;
  }

  const monthAndDay = earningsText.previousElementSibling.innerHTML;
  const monthAndYear = earningsText.parentElement.firstChild.innerHTML;
  
  const month = monthAndDay.split(" ")[0];
  const day = monthAndDay.split(" ")[1];
  const year = monthAndYear.split(" ")[1];

  return new Date(`${month} ${day} ${year}`).toDateString();
}

export default async function getAsml() {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();

  // Pretend we're headed so we don't get Access Denied
  await page.setUserAgent(USER_AGENT);

  const url = 'https://www.asml.com/en/investors/financial-calendar';
  await page.goto(url);
  const date = await page.evaluate(getDate);
  await browser.close();

  return { date, url };
};