// https://github.com/mantinedev/mantine/blob/master/packages/%40mantine/core/src/components/JsonInput/validate-json/validate-json.ts

export default function validateJson(
  value: string,
  deserialize: typeof JSON.parse
) {
  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }

  try {
    deserialize(value);
    return true;
  } catch (e) {
    return false;
  }
}
