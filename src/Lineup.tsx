
type LineupProps = {
  origin: {
    x: number;
    y: number;
  };
  target: {
    x: number;
    y: number;
  };
  onClick: (event: React.MouseEvent, key: string) => void;
  combinedKey: string;
  visiblePoints: Set<string>;
} 

const formatKoordinates = (value : number) : string => value + "%";

function Lineup(props: LineupProps) {
  const originKey = props.combinedKey.split("_")[1];
  const targetKey = props.combinedKey.split("_")[0];
  const originVisibility = props.visiblePoints.has(originKey) ? "block" : "none";
  const targetVisibility = props.visiblePoints.has(targetKey) ? "block" : "none";

  return (
    <>
      <div 
        className="lineup origin" 
        style={{ top: formatKoordinates(props.origin.y), left: formatKoordinates(props.origin.x), display: originVisibility}} 
        onClick={(event: React.MouseEvent) => props.onClick(event, originKey)}>
      </div>
      <div 
        className="lineup target" 
        style={{ top: formatKoordinates(props.target.y), left: formatKoordinates(props.target.x), display: targetVisibility}} 
        onClick={(event: React.MouseEvent) => props.onClick(event, targetKey)}>
      </div>
    </>
  );
}

export default Lineup;