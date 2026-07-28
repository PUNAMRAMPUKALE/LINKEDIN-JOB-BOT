import axios from "axios";

export class GreenhouseService {

    async fetch(company: string): Promise<any[]> {

        try {

            const boardUrl =
                `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`;

            const response = await axios.get(boardUrl);

            const jobs = response.data.jobs ?? [];

            const detailedJobs = await Promise.all(

                jobs.map(async (job: any) => {

                    try {

                        const detailUrl =
                            `https://boards-api.greenhouse.io/v1/boards/${company}/jobs/${job.id}`;

                        const response = await axios.get(detailUrl);

                        // Debug (remove later)
                        console.log("--------------------------------");
                        console.log(job.title);
                        console.log(
                            "Description Length:",
                            response.data.content?.length ?? 0
                        );

                        return response.data;

                    }
                    catch (error) {

                        console.log(
                            `Failed to fetch ${job.title}`
                        );

                        return job;

                    }

                })

            );

            return detailedJobs;

        }
        catch (error) {

            console.log(
                `Failed to fetch Greenhouse board: ${company}`
            );

            return [];

        }

    }

}