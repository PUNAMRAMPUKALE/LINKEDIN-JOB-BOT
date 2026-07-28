import axios from "axios";

export class GreenhouseService {

  async fetch(company: string): Promise<any[]> {

    try {

      const url =
        `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`;

      const response = await axios.get(url);

      return response.data.jobs ?? [];

    }
    catch {

      return [];

    }

  }

}