import { HowLongToBeatService, HowLongToBeatEntry } from 'howlongtobeat';

let hltbService = new HowLongToBeatService();
hltbService.search('Sea of stars').then((result) => console.log(result));
