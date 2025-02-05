import { TabItemProps } from "../../../../types/TabProps";
import { sanitizeForId } from "../../../../utilities/stringUtilities";

const TabItem = ({label, children} : TabItemProps) => {
    return (
        <div
            key={`key-${sanitizeForId(label)}`}
            className="tab-panel"
            role="tabpanel"
            aria-labelledby={`tab-${sanitizeForId(label)}`}
            id={`panel-${sanitizeForId(label)}`}
        >
            {children}
        </div>
    )
}

export default TabItem;