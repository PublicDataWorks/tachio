const fs = require("fs");
const path = require("path");
const { supabase } = require("../src/supabaseclient");
const logger = require("../src/logger.js")("generate-manifest");
const capabilitiesDir = path.join(__dirname);

// Get all the files in the capabilities directory
const files = fs.readdirSync(capabilitiesDir);

let manifest = [];

// Convert the loop to an async function to use await
async function generateManifest() {
  const documentation = await import("documentation"); // Move import outside the loop if possible
  for (const file of files) {
    if (path.extname(file) !== ".js" || file === "_template.js" || file === "_generate-manifest.js") {
      continue; // Skip non-JS, _template, and self
    }

    const capabilityName = path.basename(file, ".js");
    logger.info(`Generating manifest for ${capabilityName}`);

    try {
      const docs = await documentation.build([path.join(capabilitiesDir, file)], { shallow: true });
      const output = await documentation.formats.json(docs);
      manifest.push(...parseJSDoc(JSON.parse(output), capabilityName));
    } catch (err) {
      console.error(err);
    }
  }
  const { error } = await supabase
    .from('config')
    .upsert(
      { config_key: 'MANIFEST', config_value: JSON.stringify(manifest, null, 2) },
      { onConflict: 'config_key', ignoreDuplicates: false }
    )
  if (error) throw new Error(error.message);
  // fs.writeFileSync("capabilities/_manifest.json", JSON.stringify(manifest, null, 2));
}

function parseJSDoc(jsDocData, moduleName) {
  let output = [];

  jsDocData.forEach((func) => {
    const funcInfo = {
      name: `${moduleName}-${func.name}`,
    };

    // if this is the handleCapabilityMethod, skip it
    if (func.name === "handleCapabilityMethod") {
      return;
    }

    if (func.description?.children) {
      funcInfo.description = getTextFromChildren(func.description.children);

      if (func.returns?.[0]?.description?.children) {
        funcInfo.description += ` Returns: ${getTextFromChildren(func.returns[0].description.children,)}`;
      }
    }
    funcInfo.input_schema = {
      "type": "object"
    }
    if (func.params?.length > 0) {
      funcInfo.input_schema.properties = func.params
        .filter((param) => param.description?.children)
        .reduce((schema, param) => {
          schema[param.name] = {
            type: param.type.name.toLowerCase(),
            description: getTextFromChildren(param.description.children),
          };
          return schema;
        }, {});
    }
    output.push(funcInfo);
  });

  return output;
}

function getTextFromChildren(children) {
  return children
    .map((child) => child.children.map((c) => c.value).join(" "))
    .join(" ");
}

// Call the async function
generateManifest().then(() => {
  logger.info('Manifest generation complete.')
  process.exit(0);
}).catch(console.error);
