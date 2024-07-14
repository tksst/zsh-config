import fs from "node:fs";
import { stdin, stdout } from "node:process";

import { parse } from "yaml";

const x = parse(fs.readFileSync(stdin.fd, "utf-8"));

const markdownBody = x[0].body.map((it) => `- ${it}\n`).join("");

fs.writeFileSync(stdout.fd, markdownBody, { encoding: "utf-8" });
