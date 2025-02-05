import { ReactElement, useState } from "react";
import { TabItemProps, TabListProps } from "../../../../types/TabProps";
import React from "react";
import TabItem from "./TabItem";
import { sanitizeForId } from "../../../../utilities/stringUtilities";
import "../../css/Tabs.css"

const TabList = ({children, activeTabIndex = 0} : TabListProps) => {

    const [activeTab, setActiveTab] = useState(activeTabIndex);
    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const tabs = React.Children.toArray(children).filter(
        (child): child is ReactElement<TabItemProps> =>
            React.isValidElement(child) && child.type === TabItem 
    );

    return (
        <div className="tabs">
            <nav className="tab-list-wrapper">
                <ul className="tab-list" role="tablist" aria-orientation="horizontal">
                    {tabs.map((tab, index) => (
                        <li key={`tab-${index}`}>
                            <button
                                key={`tab-btn-${index}`}
                                role="tab"
                                id={`tab-${sanitizeForId(tab.props.label)}`}
                                aria-controls={`panel-${sanitizeForId(tab.props.label)}`}
                                aria-selected={activeTab === index}
                                onClick={() => handleTabClick(index)}
                                className={`tab-btn ${activeTab === index && "tab-btn--active"}`}
                            >{tab.props.label}</button>
                        </li>
                    ))}
                </ul>
            </nav>
            {tabs[activeTab]}
        </div>
    )
};

export default TabList