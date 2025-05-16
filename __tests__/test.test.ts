
type Pokemon = {
  name: string;
  types: string[];
};

const bulbasaur: Pokemon = {
  name: "Bulbasaur",
  types: ["Grass", "Poison"],
};

const charmander: Pokemon = {
  name: "Charmander",
  types: ["Fire"],
};

const squirtle: Pokemon = {
  name: "Squirtle",
  types: ["Water"],
};

describe("Pokemon type validation", () => {
  it("Bulbasaur should be Grass type", () => {
    expect(bulbasaur.types).toContain("Grass");
  });

  it("Charmander should be Fire type", () => {
    expect(charmander.types).toContain("Fire");
  });

  it("Squirtle should be Water type", () => {
    expect(squirtle.types).toContain("Water");
  });
});
