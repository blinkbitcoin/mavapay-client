import { mavapayClient } from "."
;(() => {
  mavapayClient.configureAuth({
    network: "mainnet",
    apiKey: "1a0e27aec9b87c5fc98948ce6e2304b31954ca3a468",
  })

  mavapayClient.getBanksByCountry("NG")
})()
