import yaml from "js-yaml";

import fs from "node:fs";
import { stdin, stdout } from "node:process";

const x = yaml.load(fs.readFileSync(stdin.fd, "utf-8"));

fs.writeFileSync(stdout.fd, new Date(x[0].date).toISOString());
