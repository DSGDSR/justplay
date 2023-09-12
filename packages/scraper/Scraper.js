const { parse } = require("node-html-parser");

module.exports = class Scraper {
    constructor(url) {
        this.response = this.init(url);
    }
    // init fetch request
    async init(url) {
        const rest = await fetch(url);
        return await rest.text();
    }
    // get meta tags from html
    async getAttribute(tag) {
        const root = parse(await this.response);
        const text = root.querySelector(tag).getAttribute("content");
        return text;
    }
    // get tags from html
    async getText(tag) {
        const root = parse(await this.response);
        const text = root.querySelector(tag).text;
        return text;
    }
}