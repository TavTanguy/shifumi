export default class Card {
  private static listCards = [
    new Card(0, "Pierre", "pierre.png"),
    new Card(1, "Feuille", "feuille.png"),
    new Card(2, "Ciseaux", "ciseau.png")
  ];
  private static baseUrl = "/";
  private id: number;
  private _name: string;
  private urlImage: string;
  public get name() {
    return this._name;
  }
  public get url() {
    return Card.baseUrl + this.urlImage;
  }
  private constructor(id: number, name: string, urlImage: string) {
    this.id = id;
    this._name = name;
    this.urlImage = urlImage;
  }

  public static get(id: number): Card | null {
    for (const card of this.listCards) {
      if (card.id === id) return card;
    }
    return null;
  }
}
