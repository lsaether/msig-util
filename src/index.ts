import program from "commander";

import Logger from "./Logger";

const helloWorld = () => {
  Logger.info("Hello world!");
};

program.command("start").action(helloWorld);

program.parse(process.argv);
