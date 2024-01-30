import React from "react";

export const DashboardLayoutContext = React.createContext<((idx: number) => void) | null>(null);