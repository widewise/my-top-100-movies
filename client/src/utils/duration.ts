import { Duration } from "luxon";

export const fmtDuration = (minutes: number): string => {
    const duration = Duration.fromObject({ minutes }),
        hours = duration.as("hours");

    if (minutes < 60) return `${minutes}m`;
    if ((minutes % 60) === 0) return `${Math.floor(hours)}h`;

    return `${Math.floor(hours)}h ${minutes % 60}m`;
};