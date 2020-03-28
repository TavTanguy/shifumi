class PartyStarted {
  private _cbOnChange?: (value: boolean) => void;
  public onChange(cb: (value: boolean) => void) {
    this._cbOnChange = cb;
  }
  private _value = false;
  public get value() {
    return this._value;
  }
  public set value(value: boolean) {
    this._value = value;
    if (this._cbOnChange) this._cbOnChange(value);
  }
}

const partyStartedStore = new PartyStarted();
export default partyStartedStore;
