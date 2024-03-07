import { Injectable } from '@nestjs/common';
import * as puppeteer from "puppeteer"
import { Scrape } from './dto/scrape.dto';

@Injectable()
export class ScrapperService {
  getHello(): string {
    return 'Hello World!';
  }

  async scrapeYoutube(request: Scrape): Promise<{ title: string; thumbnailUrl: string }> {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(request.url);

    // Esperar a que el evento 'domcontentloaded' ocurra
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    // Obtener el título del video
    const title = await page.$eval('#container h1.title', (element: any) => element.textContent);

    // Obtener la URL de la imagen de portada del video
    const thumbnailUrl = await page.$eval('meta[property="og:image"]', (element: any) => element.content);

    await browser.close();

    return { title, thumbnailUrl };
  }

}
