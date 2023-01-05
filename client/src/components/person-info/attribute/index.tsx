import React, {FunctionComponent} from "react";
import { Typography } from "@mui/material";

interface IProps {
    label: string;
    value?: string;
}

export const PersonAttribute : FunctionComponent<IProps> = ({
    label,
    value = ""
}: IProps) => (<>
    {value ? (<>
        <Typography
            component="p"
            mt={2}
            textAlign={"left"}
            sx={{fontWeight: 'bold'}}
        >
            {label}
        </Typography>
        <Typography
            component="p"
            mt={0}
            textAlign={"left"}>
            {value}
        </Typography>
    </>) : null}
</>);