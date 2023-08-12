import { useState } from "react";
import { invoke } from '@tauri-apps/api/tauri';

import rawConfig from "./config.json";
import "./App.css";

import Dropdown from "./Dropdown";
import Map from "./Map";
import Images from "./Images";

const config: MapConfig = rawConfig as unknown as MapConfig;
const mapsDir: string = "/src/assets/maps/";
const lineupsDir: string = "/src/assets/lineups/";

interface MapConfig {
  maps: string[];
  locations: {
    [key: string]: {
      [key: string]: {
        x: number;
        y: number;
      };
    };
  };
  lineups: {
    [key: string]: {
      [key: string]: {
        origin: string | { x: number; y: number };
        target: string | { x: number; y: number };
      };
    };
  };
}


function App() {
  const [selectedSvg, setMap] = useState<string>("");
  const [selectedLineup, setLineup] = useState<string>("")
  const [visibleLineups, setVisibleLineups] = useState<Set<string>>(new Set());


  const defaultLineupView = () => {
    const newSet : Set<string> = config.lineups[selectedSvg] 
      ? new Set(Object.entries(config.lineups[selectedSvg]).map(([key, value]) => key.split("_")[0]))
      : new Set();
    setVisibleLineups(newSet);
  }
  const handleLineupSelect = (lineup: string) => {
    setLineup(lineup);
  }
  function handleMapSelect(map: string) {
    setMap(map);
  }

  return (
    <>
      <Dropdown handleMapSelect={handleMapSelect} maps={config.maps} selectedSvg={selectedSvg}/>
      <Map 
        map={selectedSvg}
        mapsDir={mapsDir}
        setLineup={setLineup}
        defaultLineupView={defaultLineupView}
        setVisibleLineups={setVisibleLineups}
        visibleLineups={visibleLineups}
      />
      {selectedLineup !== "" && 
        <Images 
          lineupsDir={lineupsDir + selectedSvg + "/"} 
          selectedLineup={selectedLineup} 
          setLineup={handleLineupSelect}
          map={selectedSvg}
          handleMapSelect={handleMapSelect}
          defaultLineupView={defaultLineupView}
        />
      }
    </>
  );
}

export default App;