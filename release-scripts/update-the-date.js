import fs from "node:fs";
import { stdin, stdout } from "node:process";

import { parseDocument } from "yaml";

const x = parseDocument(fs.readFileSync(stdin.fd, "utf-8"));

// Replace the date of the changelog
for (const y of x.contents.items[0].items) {
    if (y.key.value === "date") {
        y.value.value = new Date().toISOString();
    }
}

fs.writeFileSync(stdout.fd, x.toString(), { encoding: "utf-8" });
