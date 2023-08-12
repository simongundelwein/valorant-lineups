type DropdownProps = {
  handleMapSelect: (map: string) => void;
  maps: string[];
  selectedSvg: string;
}

function Dropdown(props: DropdownProps) {
  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle position-absolute" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {props.selectedSvg || "Select an SVG file"}
      </button>
      <ul className="dropdown-menu">
        {props.maps.map((entry) =>
          <li key={entry}>
            <a className="dropdown-item" href="#" onClick={() => props.handleMapSelect(entry == null ? "" : entry)}>
              {entry}
            </a>
          </li>)}
      </ul>
    </div>
  );
}

export default Dropdown;