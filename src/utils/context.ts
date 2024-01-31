import React from "react";

import { GlobalStateVariableType } from "@/global/type";

// export const DashboardLayoutContext = React.createContext<((idx: number) => void) | null>(null);


export const GlobalStateContext = React.createContext<{ [key: string]: [GlobalStateVariableType, (val: GlobalStateVariableType) => void] }>({});