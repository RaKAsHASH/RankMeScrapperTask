import puppeteer from 'puppeteer';

export const scrapePageContent = async (url) => {
  let browser;
  try {
    if (!url || !/^https?:\/\/[^\s]+$/i.test(url)) {
      throw new Error('URL You Have Entered Is Invalid, Please Check Again');
    }

    browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(30000);

    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const content = await page.evaluate(() => document.body.innerText);

    return { success: true, content };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error.message);
    return { success: false, error: error.message };
  } finally {
    if (browser) await browser.close();
  }
};
