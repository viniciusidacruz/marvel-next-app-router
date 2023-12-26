import axios from "axios";

import { Hero } from "@/models/hero";
import { ResponseHeroes } from "./heroes.service.types";

export class HeroesService {
  async listAllByName(name: string): Promise<ResponseHeroes> {
    const { data } = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&ts=1&apikey=8b8c5c363a2551d40b8f8eb975b331ed&hash=4eea114a058dbe982b480e6df3ba92dc`
    );

    return data.data;
  }

  async detailsById(id: string): Promise<Hero> {
    const { data } = await axios.get(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=8b8c5c363a2551d40b8f8eb975b331ed&hash=4eea114a058dbe982b480e6df3ba92dc`
    );

    return data.data.results[0];
  }
}
