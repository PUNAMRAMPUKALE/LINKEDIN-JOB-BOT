import { chromium, Browser } from "playwright";

export async function launchBrowser(): Promise<Browser> {
  return chromium.launch({
    headless: true,
  });
}