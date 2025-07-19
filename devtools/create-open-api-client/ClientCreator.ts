import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { parseArgs } from "node:util";
import { ChildProcess } from "@figliolia/child-process";

export class ClientCreator {
  public static ROOT = resolve(__dirname, "../../");
  public static SRC = join(this.ROOT, "src");
  public static TEMPLATE = resolve(__dirname, "./template.txt");

  public static async generate() {
    const { name, spec } = this.parseArgs();
    console.log("Generating your spec");
    const { directory, typesFile } = await this.generateTypes(spec);
    const outputFile = await this.generateClient(directory, name);
    await new ChildProcess(`yarn eslint --fix ${typesFile} ${outputFile}`)
      .handler;
    console.log("Done!");
  }

  private static async generateClient(directory: string, name: string) {
    const template = readFileSync(this.TEMPLATE).toString();
    const outputFile = join(directory, "index.ts");
    writeFileSync(
      join(directory, "index.ts"),
      template.replace("<CLIENT_NAME>", name),
    );
    return outputFile;
  }

  private static async generateTypes(spec: string) {
    const directory = dirname(spec);
    const typesFile = join(directory, "types.ts");
    await new ChildProcess(`npx openapi-typescript ${spec} -o ${typesFile}`)
      .handler;
    return { directory, typesFile };
  }

  private static parseArgs() {
    const args = parseArgs({
      args: process.argv.slice(2),
      options: {
        spec: {
          short: "s",
          type: "string",
        },
        name: {
          short: "n",
          type: "string",
        },
      },
    });
    const { spec, name } = args.values;
    if (!spec) {
      console.log(
        "Please specify the directory containing your openapi.yaml file using the --spec flag",
      );
      process.exit(0);
    }
    const specPath = this.resolvePath(spec);
    if (!existsSync(specPath)) {
      console.log("Open API spec not found");
      process.exit(0);
    }
    if (!name || /\W/.test(name)) {
      console.log(
        "Please specify JavaScript valid name for your generated client using the --name flag",
      );
      process.exit(0);
    }
    return { name, spec };
  }

  private static resolvePath(path: string) {
    return isAbsolute(path) ? path : join(this.ROOT, path);
  }
}
