import program from "commander";

import { deriveAddress } from "./actions/deriveAddress";

program
  .command("derive")
  .option("--addresses <addr1,addr2,...>", "The addresses that compose the multisig (comma-separated).", "")
  .option("--threshold <num>", "The threshold of approvals needed.", "0")
  .option("--ss58Prefix <num>", "The prefix for the network to use for encoding.", "0")
  .action(deriveAddress);

program.parse(process.argv);
