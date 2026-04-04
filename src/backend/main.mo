import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Float "mo:core/Float";

actor {
  type Category = {
    #basic;
    #intermediate;
    #trend;
  };

  type Haircut = {
    name : Text;
    description : Text;
    priceUSD : Float;
    category : Category;
  };

  module Category {
    public func compare(c1 : Category, c2 : Category) : { #less; #equal; #greater } {
      switch (c1, c2) {
        case (#basic, #basic) { #equal };
        case (#basic, _) { #less };
        case (_, #basic) { #greater };
        case (#intermediate, #intermediate) { #equal };
        case (#intermediate, #trend) { #less };
        case (#trend, #intermediate) { #greater };
        case (#trend, #trend) { #equal };
      };
    };

    public func toText(cat : Category) : Text {
      switch (cat) {
        case (#basic) { "Basic" };
        case (#intermediate) { "Intermediate" };
        case (#trend) { "Trend" };
      };
    };
  };

  module Haircut {
    public func compare(h1 : Haircut, h2 : Haircut) : { #less; #equal; #greater } {
      Text.compare(h1.name, h2.name);
    };

    public func compareByPrice(h1 : Haircut, h2 : Haircut) : { #less; #equal; #greater } {
      Float.compare(h1.priceUSD, h2.priceUSD);
    };
  };

  var bcvRate : Float = 473.92;

  let haircuts = Map.empty<Text, Haircut>();

  func initializeHaircuts() {
    let initialHaircuts : [Haircut] = [
      {
        name = "Corte Clásico";
        description = "Corte clásico para hombres.";
        priceUSD = 3.0;
        category = #basic;
      },
      {
        name = "Degradado/Fade";
        description = "Corte degradado/fade moderno";
        priceUSD = 4.0;
        category = #intermediate;
      },
      {
        name = "Skin Fade";
        description = "Degradado al ras";
        priceUSD = 5.0;
        category = #trend;
      },
      {
        name = "Corte con Tijera";
        description = "Técnica de corte exclusivamente con tijera";
        priceUSD = 4.0;
        category = #intermediate;
      },
      {
        name = "Diseño/Líneas";
        description = "Diseños y líneas en cortes";
        priceUSD = 2.0;
        category = #intermediate; // fixed mapping from #addOn
      },
      {
        name = "Barba Básica";
        description = "Afeitada y arreglo de barba";
        priceUSD = 3.0;
        category = #basic;
      },
      {
        name = "Barba con Diseño";
        description = "Diseños con cuchilla/barba";
        priceUSD = 4.0;
        category = #intermediate;
      },
      {
        name = "Corte + Barba";
        description = "Servicio completo de corte y barba";
        priceUSD = 7.0;
        category = #intermediate;
      },
      {
        name = "Afro Fade";
        description = "Degradado estilo afro";
        priceUSD = 6.0;
        category = #trend;
      },
      {
        name = "Textured Crop";
        description = "Corte crop texturizado";
        priceUSD = 5.0;
        category = #trend;
      },
      {
        name = "French Crop";
        description = "Corte francés moderno";
        priceUSD = 5.0;
        category = #trend;
      },
      {
        name = "Pompadour";
        description = "Corte estilo pompadour";
        priceUSD = 6.0;
        category = #trend;
      },
      {
        name = "Burst Fade";
        description = "Degradado circular";
        priceUSD = 6.0;
        category = #trend;
      },
      {
        name = "Mullet Moderno";
        description = "Corte mullet actualizado";
        priceUSD = 7.0;
        category = #trend;
      },
      {
        name = "Corte Completo Premium";
        description = "Paquete premium completo";
        priceUSD = 10.0;
        category = #trend;
      },
    ];

    for (h in initialHaircuts.values()) {
      haircuts.add(h.name, h);
    };
  };

  initializeHaircuts();

  public query ({ caller }) func getBCVRate() : async Float {
    bcvRate;
  };

  public shared ({ caller }) func updateBCVRate(newRate : Float) : async () {
    bcvRate := newRate;
  };

  public query ({ caller }) func getHaircutsArray() : async [Haircut] {
    haircuts.values().toArray().sort();
  };

  public query ({ caller }) func getHaircutsByPrice() : async [Haircut] {
    haircuts.values().toArray().sort(Haircut.compareByPrice);
  };

  public query ({ caller }) func getHaircutPriceInVES(name : Text) : async ?Float {
    switch (haircuts.get(name)) {
      case (null) { null };
      case (?haircut) { ?(haircut.priceUSD * bcvRate) };
    };
  };
};
