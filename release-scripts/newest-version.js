import fs from "node:fs";
import { stdin, stdout } from "node:process";

import { parse } from "yaml";

const x = parse(fs.readFileSync(stdin.fd, "utf-8"));

fs.writeFileSync(stdout.fd, `${x[0].version}\n`, { encoding: "utf-8" });
