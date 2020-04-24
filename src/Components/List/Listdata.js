import React, { useState, useEffect } from 'react';
import "./Listdata.css";
function Listdata() {

  //function to show pokemon types name  in list
  function createTypes(types, ul) {
    types.forEach(function (type) {
      let typeLi = document.createElement("li");
      typeLi.innerText = type["type"]["name"];
      ul.append(typeLi);
    });
  }
  
  //function to show pokemon id ,names
  function renderPokemon(pokeData) {
    let allPokemonContainer = document.getElementById("poke-container");
    let pokeContainer = document.createElement("div");
    pokeContainer.classList.add("ui", "pokedata");
    
    //call create image function for each pokemon, pass id and div tag
    createPokeImage(pokeData.id, pokeContainer);
    let pokeName = document.createElement("h4");
    pokeName.innerText = pokeData.name;

    let pokeNumber = document.createElement("p");
    pokeNumber.innerText = `#${pokeData.id}`;
    let pokeTypes = document.createElement("ul");

    //call create types function for each pokemon pass types and ul tag
    createTypes(pokeData.types, pokeTypes);
    pokeContainer.append(pokeNumber,pokeName, pokeTypes);
    allPokemonContainer.appendChild(pokeContainer);
  }
 
//create pokemon image and add sprites image on href 
  function createPokeImage(pokeID, containerDiv) {
    let pokeImgContainer = document.createElement("a");
    let pokeImgContainer2 = document.createElement("a");

    pokeImgContainer.href = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokeID}.png`;
    pokeImgContainer.classList.add("image");

    pokeImgContainer2.classList.add("image");
    let pokeImage = document.createElement("img");
    pokeImage.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
  }

  useEffect(() => {
    async function fetchData(pokemon) {
      var id = pokemon.id;
      let containerDiv = document.createElement("div");
      createPokeImage(id, containerDiv);

      let url = pokemon.url;
      fetch(url)
        .then((response) => response.json())
        .then(function (pokeData) {
          console.log(pokeData);
          renderPokemon(pokeData);
        });
    }


    //first function to call it calls API and get all 151 pokemon objects
    //now render through all object and get data by calling seperate function
    function fetchallPokemon() {
      fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then((response) => response.json())
        .then(function (allpokemon) {
          allpokemon.results.forEach(function (pokemon) {
            fetchData(pokemon);
          });
        });
    }

    fetchallPokemon();
  }, []);

  return (
    <div className="poke-container" id="poke-container">
         
      <div className="pokedata">
        
      </div>
    </div>
  );
}

export default Listdata;
