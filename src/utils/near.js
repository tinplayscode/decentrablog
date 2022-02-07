import getConfig from "../config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export function getTransactionUrl(hash) {
  return hash.length > 30 && hash.length < 50
    ? `https://explorer.${networkId}.near.org/transactions/${hash}`
    : "/404";
}
