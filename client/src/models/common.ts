import { AlertColor } from "@mui/material/Alert/Alert";

export interface IMessage {
    title: string;
    severity: AlertColor;
    message: string;
}