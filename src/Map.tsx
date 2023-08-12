import { useEffect, useState } from "react";
import Lineup from "./Lineup";
import "./Map.css";
import rawConfig from "./config.json";

const config: MapConfig = rawConfig as unknown as MapConfig;

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
type MapProps = {
  mapsDir: string;
  map: string;
  setLineup: React.Dispatch<React.SetStateAction<string>>;
  setVisibleLineups: React.Dispatch<React.SetStateAction<Set<string>>>;
  defaultLineupView: (setVisibleLineups: (newSet: Set<string>) => void) => void;
  visibleLineups: Set<string>;
}
type Lineup = {
  origin: string | {
      x: number;
      y: number;
  };
  target: string | {
      x: number;
      y: number;
  };
}

  function getOrigin(lineup : Lineup, map : string) : {x: number, y : number} {
    if (typeof lineup.origin === 'string') 
      return config.locations[map][lineup.origin];
    else 
      return lineup.origin;
  }
  function getTarget(lineup : Lineup, map : string) : {x: number, y : number} {
    if (typeof lineup.target === 'string') 
      return config.locations[map][lineup.target];
    else 
      return lineup.target;
  }


function Map(props: MapProps) {

  const defaultLineupView = () => {
    const newSet : Set<string> = config.lineups[props.map] 
      ? new Set(Object.entries(config.lineups[props.map]).map(([key, value]) => key.split("_")[0]))
      : new Set();
    props.setVisibleLineups(newSet);
  }

  useEffect(() => {
    defaultLineupView();
  }, [config.lineups[props.map]]
  );

  const handleLineupSelect = (event: React.MouseEvent, lineupKey: string, helperTarget=true) => {
    const isTarget : boolean = helperTarget && event.currentTarget.classList.contains("target");
    if (isTarget) {
      const newSet = new Set<string>(
        Object.entries(config.lineups[props.map])
          .map(([key, value]) => key.split("_"))
          .filter((partedKey) => partedKey[0] === lineupKey)
          .map((partedKey) => partedKey[1])
        );
      newSet.add(lineupKey);
      props.setVisibleLineups(newSet);
      props.setLineup("");
    }
    else {
      const newSet = new Set<string>(
        Object.entries(config.lineups[props.map])
          .map(([key, value]) => key.split("_")[0])
          .filter((key) => props.visibleLineups.has(key))
      );
      props.setLineup(Array.from(newSet)[0] + "_" + lineupKey)

      newSet.add(lineupKey);
      console.log(newSet);
      props.setVisibleLineups(newSet);
    }
  }

  const lineups = config.lineups[props.map] || {};
  const lineupList = Object.entries(lineups).map(([key, value]) => (
    <Lineup key={key} 
      origin={getOrigin(config.lineups[props.map][key], props.map)} 
      target={getTarget(config.lineups[props.map][key], props.map)}
      onClick={(event : React.MouseEvent, key : string) => handleLineupSelect(event, key)}
      combinedKey={key}
      visiblePoints={props.visibleLineups}
    />
  ));

  return (
    <div className="map">
      <div>
        <img src={props.map ? `${props.mapsDir + props.map}.svg` : ""} alt="" />
        {lineupList}
      </div>
    </div>
  );
}

export default Map;