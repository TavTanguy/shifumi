import ioSocket from "socket.io-client";
import Req, { ResType } from "./Req";
import storeApp, { StatusParty, PartyResult } from "./Store";
import urls from "./consts";

class Connection {
  private req!: Req;

  public init(vm: Vue, socket?: SocketIOClient.Socket) {
    if (!this.req) {
      if (socket) this.req = new Req(socket, vm);
      else this.req = new Req(ioSocket(urls.urlSocketIo), vm);

      this.setListeners();
    }
  }

  private setListeners() {
    this.req.on("players select cards", () => {
      storeApp.nameParty = "";
      storeApp.statusParty = StatusParty.selectCard;
    });

    this.req.on("result party", (data: { partyResult: PartyResult; yourCard: number; cardOfOpponent: number }) => {
      storeApp.setPartyResult(data.partyResult, data.yourCard, data.cardOfOpponent);
    });

    this.req.on("restart party", () => {
      storeApp.reset();
      storeApp.statusParty = StatusParty.selectCard;
    });

    this.req.on("player leave", () => {
      setTimeout(() => {
        storeApp.generalError = "Le joueur a quitté la partie";
      }, 200);
    });

    this.req.on("party delete", () => {
      storeApp.reset();
    });
  }

  public createParty() {
    this.req.emit("create party", (res: { nameParty?: string } & ResType) => {
      if (res?.nameParty) storeApp.nameParty = res.nameParty;
    });
  }

  public regenerateSecret() {
    this.req.emit("regenerate secret", (res: { nameParty?: string } & ResType) => {
      if (res?.nameParty) storeApp.nameParty = res.nameParty;
    });
  }

  public leaveParty() {
    this.req.emit("leave party", () => {
      storeApp.reset();
    });
  }

  public joinParty(nameParty: string) {
    this.req.emit("join party", nameParty, () => {
      storeApp.statusParty = StatusParty.selectCard;
    });
  }

  public sendCard(idCard: number) {
    this.req.emit("play card", idCard, null);
  }

  public voteRestart() {
    this.req.emit("vote restart", null);
  }

  public quitParty() {
    this.req.emit("leave party", null);
  }
}
const connection = new Connection();

export default connection;
