import { StyledRangeButtons } from "../../../Styles";

function TimeRangeButton({ activeRange, setActiveRange }) {
  return (
    <div>
      <StyledRangeButtons>
        <li>
          <button
            className={activeRange === "short" ? "active" : ""}
            onClick={() =>
              setActiveRange(() => {
                return "short";
              })
            }
          >
            This Month
          </button>
        </li>
        <li>
          <button
            className={activeRange === "medium" ? "active" : ""}
            onClick={() => setActiveRange("medium")}
          >
            Last 6 Month
          </button>
        </li>
        <li>
          <button
            className={activeRange === "long" ? "active" : ""}
            onClick={() => setActiveRange("long")}
          >
            All Time
          </button>
        </li>
      </StyledRangeButtons>
    </div>
  );
}

export default TimeRangeButton;
