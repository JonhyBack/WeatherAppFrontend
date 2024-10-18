import { Link, useLocation } from 'react-router-dom';
import './LinkTabs.css'

interface TabProps {
    to: string;
    label: string;
}

function LinkTab({ label, to }: TabProps) {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? 'active' : 'inactive';
    };

    return (
        <Link
            className={`tab ${isActive(to)}`}
            to={to}
        >
            {label}
        </Link >
    );
};

interface TabsProps {
    tabs: { label: string, to: string }[];
}

function LinkTabs({ tabs }: TabsProps) {
    return (
        <div className="tabs">
            {tabs.map((tab, index) => (
                <LinkTab
                    key={index}
                    to={tab.to}
                    label={tab.label}
                />
            ))}
        </div>
    );
};

export default LinkTabs;