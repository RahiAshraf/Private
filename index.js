
import jsonfile from "jsonfile";
import moment from "moment";
import { simpleGit } from "simple-git";
import random from "random";

const path = "./data.json";
const git = simpleGit();

const makeCommits = async (n) => {
  try {
    // Make sure this folder is already a Git repository.
    for (let i = 0; i < n; i++) {
      const date = moment()
        .subtract(1, "year")
        .add(1, "day")
        .add(random.int(0, 54), "weeks")
        .add(random.int(0, 6), "days")
        .format();

      await jsonfile.writeFile(path, { date });

      await git.add([path]);

      await git.commit(`Update data: ${date}`, {
        "--date": date,
      });

      console.log(`Commit ${i + 1}/${n} created`);
    }

    console.log("All commits created.");
  } catch (error) {
    console.error("Git error:", error.message);
  }
};

makeCommits(50);