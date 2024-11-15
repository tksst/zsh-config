import { TZDate } from "@date-fns/tz";
import Ajv from "ajv";
import addFormats from "ajv-formats"
import { format } from "date-fns";
import yaml from "js-yaml";

import fs from "node:fs";
import { stdin, stdout, stderr } from "node:process";

import jsonSchema from "./changelog-schema.json" assert { type: "json" };

function toRFC2822DateString(date, zoneString) {
	return format(new TZDate(date, zoneString), "eee, dd MMM yyyy HH:mm:ss xx");
}

function printErr(str){
	stderr.write(`${str}\n`);
}

// load Ajv and schema
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(jsonSchema);

// load YAML
const x = yaml.load(fs.readFileSync(stdin.fd, "utf-8"));

// validation
if (!validate(x)) {
	printErr("input validation failed.");
	printErr(ajv.errorsText(validate.errors));
	printErr("");
	printErr("details:");
	printErr(JSON.stringify(validate.errors, null, 2));
	stderr.end();
	stdout.end();
	process.exit(1);
}

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
