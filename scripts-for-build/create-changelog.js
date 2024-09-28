import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import yaml from "js-yaml";

import fs from "node:fs";
import { stdin, stdout } from "node:process";

function toRFC2822DateString(date, zoneString) {
	return format(new TZDate(date, zoneString), "eee, dd MMM yyyy HH:mm:ss xx");
}

const x = yaml.load(fs.readFileSync(stdin.fd, "utf-8"));

const result = [];

for (const rev of x) {
	let str = "";

	str += `${rev.name} (${rev.version}) ${rev.distribution}; urgency=${rev.urgency}\n\n`

	str += rev.body.map(it => `  * ${it}\n`).join("");

	str += "\n";
	str += ` -- ${rev.author}  ${toRFC2822DateString(rev.date, rev["output-tz"])}\n`;

	result.push(str);
}

stdout.write(result.join("\n"));
stdout.end();
