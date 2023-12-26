import axios from "axios";
import { HeroesService } from "./heroes.service";

import {
  mockResponseDetailsById,
  mockResponseListAll,
} from "./__mocks__/responses";

jest.mock("axios");

describe("HeroesService", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const heroesService = new HeroesService();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("listAllByName", () => {
    it("fetches successfully data from the Marvel API", async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: { data: mockResponseListAll },
      });

      const result = await heroesService.listAllByName("Iron Man");

      expect(result).toEqual(mockResponseListAll);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "http://gateway.marvel.com/v1/public/characters?nameStartsWith=Iron Man&ts=1&apikey=8b8c5c363a2551d40b8f8eb975b331ed&hash=4eea114a058dbe982b480e6df3ba92dc"
      );
    });

    it("fetches erroneously data from the Marvel API", async () => {
      const errorMessage = "Network Error";

      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(heroesService.listAllByName("Iron Man")).rejects.toThrow(
        errorMessage
      );
    });
  });

  describe("detailsById", () => {
    it("fetches successfully data from the Marvel API", async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: { data: { results: [mockResponseDetailsById] } },
      });

      const result = await heroesService.detailsById("1");

      expect(result).toEqual(mockResponseDetailsById);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        "https://gateway.marvel.com:443/v1/public/characters/1?ts=1&apikey=8b8c5c363a2551d40b8f8eb975b331ed&hash=4eea114a058dbe982b480e6df3ba92dc"
      );
    });

    it("fetches erroneously data from the Marvel API", async () => {
      const errorMessage = "Network Error";

      mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(heroesService.detailsById("1")).rejects.toThrow(
        errorMessage
      );
    });
  });
});
