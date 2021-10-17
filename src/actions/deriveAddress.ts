import { encodeAddress, decodeAddress } from "@polkadot/keyring";
import { u8aSorted } from "@polkadot/util";
import { blake2AsU8a } from "@polkadot/util-crypto";

type Options = {
  addresses: string;  // CSV of the addresses.
  ss58Prefix: string; // Prefix for the network encoding to use.
  threshold: string;  // Number of addresses that are needed to approve an action.
}

const derivePubkey = (addresses: string[], threshold = 1): Uint8Array => {
  const prefix = "modlpy/utilisuba";
  const payload = new Uint8Array(prefix.length + 1 + 32 * addresses.length + 2);
  payload.set(
    Array.from(prefix).map((c) => c.charCodeAt(0)),
    0
  );
  payload[prefix.length] = addresses.length << 2;
  const pubkeys = addresses.map((addr) => decodeAddress(addr));
  u8aSorted(pubkeys).forEach((pubkey, idx) => {
    payload.set(pubkey, prefix.length + 1 + idx * 32);
  });
  var view = new DataView(new ArrayBuffer(2));
  view.setUint16(0, threshold, true);
  payload.set(new Uint8Array(view.buffer), prefix.length + 1 + 32 * addresses.length)

  return blake2AsU8a(payload);
}

export const deriveAddress = (opts: Options): void => {
  const { addresses, ss58Prefix, threshold } = opts;

  if (!addresses) throw new Error("Please provide the addresses option.");

  const addrs = addresses.split(",").filter((x) => !!x);

  const pubkey = derivePubkey(addrs, Number(threshold));
  const msig = encodeAddress(pubkey, Number(ss58Prefix));

  console.log("-".repeat(32));
  console.log(`Addresses: ${addrs.join(" ")}`);
  console.log(`Threshold: ${threshold}`);
  console.log(`Multisig Address (SS58: ${ss58Prefix}): ${msig}`);
  console.log("-".repeat(32));
}
