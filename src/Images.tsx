import "./Images.css";

type ImagesProps = {
  lineupsDir: string;
  selectedLineup: string;
  setLineup: (lineup: string) => void;
  map: string;
  handleMapSelect: (map: string) => void;
  defaultLineupView: () => void;
}



function Images(props: ImagesProps) {

  const onClose = () => {
    props.setLineup("");
    props.defaultLineupView();
  }

  return (
    <div className="lineup-images">
      <img className="image full" src={`${props.lineupsDir + props.selectedLineup}/full.png`} alt="full image" />
      <img className="image zoom" src={`${props.lineupsDir + props.selectedLineup}/zoom.png`} alt="zoomed image" />
      <img className="image pos" src={`${props.lineupsDir + props.selectedLineup}/pos.png`} alt="position image" />
      <button type="button" className="btn btn-primary close-button" onClick={onClose}>Close</button>
    </div>
  );
}

export default Images;