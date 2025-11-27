import React from "react";
import "./StatsGrid.css";
import StatCard from "./StatCard";

interface StatsGridProps {
    className?: string;
    stats?: Array<{
        value: string | number;
        label: string;
        icon: string;
        color: "blue" | "green" | "purple" | "yellow";
    }>;
}

const defaultStats = [
    {
        value: "12",
        label: "Total Courses",
        icon: "auto_stories",
        color: "blue" as const
    },
    {
        value: "524",
        label: "Total Students",
        icon: "groups",
        color: "green" as const
    },
    {
        value: "38",
        label: "Active Quizzes",
        icon: "quiz",
        color: "purple" as const
    },
    {
        value: "4.8",
        label: "Average Rating",
        icon: "star",
        color: "yellow" as const
    }
];

const StatsGrid: React.FC<StatsGridProps> = ({
    className = "",
    stats = defaultStats
}) => {
    return (
        <section className={`stats-grid ${className}`}>
            {stats.map((stat, index) => (
                <StatCard
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </section>
    );
};

export default StatsGrid;