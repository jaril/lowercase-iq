import { launchPage } from "../utils.js";

function getDate() {
  const items = [...document.querySelectorAll(".module_container--content-upcoming .module_item")];
  const financialResultsItem = items.filter(n => {
    const dateNode = n.querySelector(".module_date-text");
    const isAfterToday = new Date(dateNode.innerHTML).getTime() >= new Date().getTime();
    const headlineMatch = n.querySelector(".module_headline-link").innerHTML.toLowerCase().includes("earnings call");

    return isAfterToday && headlineMatch;
  });

  return financialResultsItem.length ? financialResultsItem[0].querySelector(".module_date-text").innerHTML : null;
}

export default async function getAsana() {
  const url = 'https://investors.asana.com/events-and-presentations/';
  const { page, browser } = await launchPage(url);
  const date = await page.evaluate(getDate);
  await browser.close();

  return { date, url };
};
