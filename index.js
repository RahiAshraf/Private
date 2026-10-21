import jsonfile from "jsonfile";
import moment from "moment";
import { simpleGit } from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  try {
    for (let i = 0; i < n; i++) {
      
      const date = moment("2025-01-01")
        .add(random.int(0, 364), "days")
        .hour(random.int(8, 20))
        .minute(random.int(0, 59))
        .second(random.int(0, 59))
        .format();

      await jsonfile.writeFile(path, { date });

      await git.add([path]);

      await git.commit(`Update data: ${date}`, {
        "--date": date,
      });

      console.log(`Commit ${i + 1}/${n}: ${date}`);
    }

    console.log("All commits created within 2025!");
  } catch (error) {
    console.error("Git error:", error.message);
  }
};

makeCommits(50);