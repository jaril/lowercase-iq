import Puppeteer from "puppeteer";

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36';

export async function launchPage(url) {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  
  // Pretend we're headed so we don't get Access Denied
  await page.setUserAgent(USER_AGENT);
  await page.goto(url);

  console.log(`Opened ${url}`)
  return { page, browser };
}
