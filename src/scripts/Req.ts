import storeApp from "./Store";
import vueRouter from "vue-router";
/* eslint-disable */
export type ResType = ({ type: string; message: string; code?: string } & any) | undefined;

export default class Req {
  private connectedOneTime = false;
  private socket: SocketIOClient.Socket;

  constructor(socket: SocketIOClient.Socket, vmVue: Vue) {
    this.socket = socket;
    socket.on(
      "connect_error",
      function(this: Req) {
        if (!this.connectedOneTime) {
          if (location.pathname !== "/noInternet") {
            this.connectedOneTime = true;
            vmVue.$router.push("/noInternet");
          }
        } else if (location.pathname !== "/noInternet") {
          storeApp.loading = true;
          storeApp.permanentError = true;
          storeApp.generalError = "Problème de connexion avec le serveur";
        }
      }.bind(this)
    );
    socket.on(
      "connect",
      function(this: Req) {
        if (location.pathname === "/noInternet") {
          vmVue.$router.push("/");
        }
        this.connectedOneTime = true;
        storeApp.loading = false;
        storeApp.permanentError = false;
        storeApp.generalError = "";
      }.bind(this)
    );
    socket.on("first connection", () => {
      storeApp.reset();
    });
  }

  public emit(event: string, ...argsAndFn: any[]) {
    const fn: (resObj: ResType) => void | null = argsAndFn[argsAndFn.length - 1];
    const args = argsAndFn.slice(0, argsAndFn.length - 1);
    storeApp.loading = true;
    this.socket.emit(event, ...args, (res: ResType) => {
      storeApp.loading = false;
      if (res?.type === "error") {
        if (res?.code === "user-joinParty1") return (storeApp.strErrorPartyJoin = "Partie non trouvé");
        storeApp.generalError = res.message;
        console.error(`Error: ${res.message} ${res.code ? `Code: ${res.code}` : ""}`);
      } else {
        if (fn) fn(res);
      }
    });
  }

  public on(event: string, fn: Function) {
    this.socket.on(event, (...args: any[]) => {
      fn(...args);
    });
  }
}
