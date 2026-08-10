#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";
import { Polar } from "@polar-sh/sdk";

const defaultProductId = "3cbc21aa-cede-4f71-bc33-42d4667ce63f";
const defaultCheckoutBaseUrl = "https://transcriptprivate.com/buy";

loadEnvFile(".env.local");
loadEnvFile(".env");

const args = parseArgs(process.argv.slice(2));
const recipient = args.name ?? args.recipient ?? "Friend";
const productId = args.product ?? process.env.TRANSCRIPT_POLAR_PRODUCT_ID ?? defaultProductId;
const checkoutBaseUrl = args.checkoutUrl ?? process.env.TRANSCRIPT_CHECKOUT_URL ?? defaultCheckoutBaseUrl;
const maxRedemptions = Number.parseInt(args.redemptions ?? "1", 10);
const code = args.code ?? `${codePrefix(recipient)}${randomBytes(3).toString("hex").toUpperCase()}`;

if (!process.env.POLAR_ACCESS_TOKEN) {
  fail("Missing POLAR_ACCESS_TOKEN. Add it to .env.local or export it first.");
}

if (!Number.isInteger(maxRedemptions) || maxRedemptions < 1) {
  fail("--redemptions must be a positive integer.");
}

if (!/^[A-Z0-9]{3,256}$/.test(code)) {
  fail("Discount code must be 3-256 uppercase letters/numbers. Use --code ALAN123.");
}

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  server: "production",
});

try {
  const discount = await polar.discounts.create({
    name: `${recipient} free Transcript license`,
    code,
    type: "percentage",
    duration: "forever",
    basisPoints: 10000,
    maxRedemptions,
    products: [productId],
    metadata: {
      purpose: "free_license",
      recipient: String(recipient),
      created_by: "script",
    },
  });

  const verified = await polar.discounts.get({ id: discount.id });
  const url = new URL(checkoutBaseUrl);
  url.searchParams.set("discount_code", code);

  console.log("");
  console.log("Free Transcript license code created");
  console.log("------------------------------------");
  console.log(`Recipient:      ${recipient}`);
  console.log(`Code:           ${code}`);
  console.log(`Discount ID:    ${discount.id}`);
  console.log(`Max redemptions:${String(readField(verified, "maxRedemptions", "max_redemptions")).padStart(2, " ")}`);
  console.log(`Redeemed:       ${readField(verified, "redemptionsCount", "redemptions_count") ?? 0}`);
  console.log(`Checkout URL:   ${url.toString()}`);
  console.log("");
} catch (error) {
  if (error?.body) {
    try {
      fail(JSON.stringify(JSON.parse(error.body), null, 2));
    } catch {
      fail(error.body);
    }
  }
  fail(error?.message ?? String(error));
}

function parseArgs(rawArgs) {
  const result = {};

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    if (!arg.startsWith("--")) {
      continue;
    }

    const [rawKey, inlineValue] = arg.slice(2).split("=", 2);
    const value = inlineValue ?? rawArgs[index + 1];
    if (inlineValue === undefined) {
      index += 1;
    }
    result[toCamelCase(rawKey)] = value;
  }

  return result;
}

function loadEnvFile(relativePath) {
  const path = resolve(process.cwd(), relativePath);
  if (!existsSync(path)) {
    return;
  }

  const contents = readFileSync(path, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function codePrefix(value) {
  const prefix = String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 12);
  return prefix.length >= 3 ? prefix : "FREE";
}

function readField(object, camelKey, snakeKey) {
  return object?.[camelKey] ?? object?.[snakeKey] ?? null;
}

function toCamelCase(value) {
  return value.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

function printHelp() {
  console.log(`
Create a one-use 100% Polar discount for a free Transcript license.

Usage:
  npm run polar:free-license -- --name Alan
  npm run polar:free-license -- --name "Alan Gomez" --code ALANFREE1

Options:
  --name <name>         Recipient name used in Polar and code prefix.
  --code <code>         Optional custom alphanumeric discount code.
  --redemptions <n>     Max redemptions. Defaults to 1.
  --product <id>        Polar product ID. Defaults to Transcript Personal License.
  --checkout-url <url>  Checkout URL. Defaults to https://transcriptprivate.com/buy.
`);
}

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}
