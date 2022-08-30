import { launchPage } from "../utils.js";

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
  const url = 'https://www.asml.com/en/investors/financial-calendar';
  const { page, browser } = await launchPage(url);
  const date = await page.evaluate(getDate);
  await browser.close();

  return { date, url };
};