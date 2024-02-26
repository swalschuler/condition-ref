import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/components/JsonInput/validate-json/validate-json.ts
export default function validateJson(
  value: string,
  deserialize: typeof JSON.parse
) {
  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }

  try {
    const obj = deserialize(value);

    // Return false if just not valid schema
    return inputSchemaValidator(obj);
  } catch (e) {
    // Return undefined if bad JSON
    return undefined;
  }
}

export type InputJson = {
  fileName: string;
  title: string;
  url: string | undefined;
  conditionEffects: string[];
}[];

export type MetaData = {
  checkedRings: boolean;
  checkedConditionMarkers: boolean;
  json: string;
};

const schema: JSONSchemaType<InputJson> = {
  type: "array",
  items: {
    type: "object",
    properties: {
      fileName: {
        type: "string",
      },
      title: {
        type: "string",
      },
      url: {
        type: "string",
        nullable: true,
      },
      conditionEffects: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["fileName", "title", "conditionEffects"],
  },
};

const inputSchemaValidator = ajv.compile(schema);
