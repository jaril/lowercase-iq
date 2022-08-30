import { launchPage } from "../utils.js";

function getDate() {
  const texts = [...document.querySelectorAll(".item-text")];
  // TSMC typically labels their earnings as `TSMC QQYY Results - Earnings Conference and Conference Call`
  const earningsText = texts.find(elem => elem.innerHTML.toLowerCase().includes("earnings conference"));

  if (!earningsText) {
    return null;
  }

  const earningsRow = earningsText.closest(".item");

  return earningsRow.querySelector(".datetime").innerHTML;
}

export default async function getTsmc() {
  const url = 'https://investor.tsmc.com/english/financial-calendar';
  const { page, browser } = await launchPage(url);
  const date = await page.evaluate(getDate);
  await browser.close();

  return { date, url };
};
