import { useEffect, useState } from "react";
import { Profile, PokeMonObj } from "../interfaces/interface";
import "./PokemonProfile.css";

type PokeProfile = {
  pokeData: PokeMonObj;
};

const PokemonProfile = ({ pokeData }: PokeProfile): JSX.Element => {
  const [profileData, setProfileData] = useState<Profile>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  useEffect(() => {
    if (pokeData) {
      getPokemonProfileData(pokeData);
    }
  }, [pokeData]);

  const getPokemonProfileData = async (pokeData: PokeMonObj): Promise<void> => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(pokeData.url, {
        method: "GET",
      });
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="profile-container">
      {profileData && (
        <div className="profile-screen">
          {isError && <div>Error Loading Data...</div>}
          {isLoading && !isError && <div className="img-load">Loading...</div>}
          <div
            className={
              !isError && isLoading
                ? "img-loading"
                : isError
                ? "img-loading"
                : ""
            }
          >
            <div className="profile-pic">
              <img
                className="poke-img"
                src={profileData.sprites?.front_default}
                alt={profileData.name}
                onLoad={() => {
                  setIsLoading(false);
                }}
              />
            </div>
            <div className="profile-details-container">
              <div className="profile-details">
                <div>
                  {"Name: " +
                    profileData.name.charAt(0).toUpperCase() +
                    profileData.name.slice(1)}
                </div>
                <div>{"Weight: " + profileData.weight}</div>
              </div>
              <br />
              <div className="profile-details">
                <div>{"Height: " + profileData.height}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonProfile;