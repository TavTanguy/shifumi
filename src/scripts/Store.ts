import { debounce } from "ts-debounce";

interface Store {
  generalError: string;
  permanentError: boolean;
  nameParty: string;
  loading: boolean;
  namePartyToJoin: string;
  strErrorPartyJoin: string;
  statusParty: StatusParty;
  currentCardSelected: number | undefined;
  cardSelectLocked: boolean;
  partyResult: {
    partyResult: PartyResult;
    yourCard: number;
    cardOfOpponent: number;
  };
  voteRestartSended: boolean;
}
export enum PartyResult {
  equality,
  win,
  lose
}
export enum StatusParty {
  waitScreen,
  selectCard,
  showResult
}
class StoreApp {
  public store: Store;

  constructor() {
    this.store = this.getDefaultValue();
  }

  private getDefaultValue(): Store {
    return {
      generalError: "",
      loading: false,
      nameParty: "",
      permanentError: false,
      namePartyToJoin: "",
      strErrorPartyJoin: "",
      statusParty: StatusParty.waitScreen,
      currentCardSelected: undefined,
      cardSelectLocked: false,
      partyResult: {
        partyResult: PartyResult.equality,
        yourCard: 0,
        cardOfOpponent: 0
      },
      voteRestartSended: false
    };
  }

  public reset() {
    const defaultValues = this.getDefaultValue();
    for (const key in this.store) {
      (this.store[key as keyof Store] as string | boolean | StatusParty | PartyResult | undefined | object) = defaultValues[key as keyof Store];
    }
  }

  public set loading(value: boolean) {
    this.store.loading = value;
  }

  public set generalError(value: string) {
    this.store.generalError = value;
  }

  public set permanentError(value: boolean) {
    this.store.permanentError = value;
  }

  public set nameParty(value: string) {
    this.store.nameParty = value;
  }
  private fnResetErrorPartyJoin = debounce(() => {
    this.store.strErrorPartyJoin = "";
  }, 3000);
  public set strErrorPartyJoin(value: string) {
    this.store.strErrorPartyJoin = value;
    if (value !== "") {
      this.fnResetErrorPartyJoin();
    }
  }

  public set statusParty(value: StatusParty) {
    this.store.statusParty = value;
  }

  public setPartyResult(partyResult: PartyResult, yourCard: number, cardOfOpponent: number) {
    this.store.partyResult.partyResult = partyResult;
    this.store.partyResult.yourCard = yourCard;
    this.store.partyResult.cardOfOpponent = cardOfOpponent;
    this.statusParty = StatusParty.showResult;
  }
}

const storeApp = new StoreApp();
export default storeApp;
