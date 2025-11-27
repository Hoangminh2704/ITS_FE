import React from "react";
import "./StatCard.css";

interface StatCardProps {
    value: string | number;
    label: string;
    icon: string;
    color?: "blue" | "green" | "purple" | "yellow";
    className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    value,
    label,
    icon,
    color = "blue",
    className = ""
}) => {
    return (
        <div className={`stat-card ${className}`}>
            <div className={`stat-icon stat-icon-${color}`}>
                <span className="material-icons">{icon}</span>
            </div>
            <div>
                <p className="stat-value">{value}</p>
                <p className="stat-label">{label}</p>
            </div>
        </div>
    );
};

export default StatCard;