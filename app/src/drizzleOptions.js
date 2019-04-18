import AthleteToken from "./contracts/AthleteToken.json";
import CollectiblesCrowdsale from "./contracts/CollectiblesCrowdsale.json";
// import Ganache from "ganache-core"

const options = {
  web3: {
    // customProvider: Ganache.provider({
    //   gasLimit: 7000000
    // }),
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
  contracts: [AthleteToken, CollectiblesCrowdsale],
  events: {
  },
  polls: {
    accounts: 10,
  },
};

export default options;
