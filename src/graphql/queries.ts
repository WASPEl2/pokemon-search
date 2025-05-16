import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      image
      types
      attacks {
        fast {
          damage
        }
        special {
          damage
        }
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      number
      image
      classification
      types
      resistant
      weaknesses
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        number
        image
      }
    }
  }
`;
