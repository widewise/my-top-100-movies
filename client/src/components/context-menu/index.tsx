import React, {
    FunctionComponent,
    useState,
} from 'react';
import styled from 'styled-components';
import { IMovieListItem } from "../../models/movie";
import { IconButton } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ContextMenuItems } from "./menu-items";

export const ContextMenuPanel = styled.div`
    opacity: 0;
    transition: opacity .3s;

    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 100;
`;

interface Props {
    movie: IMovieListItem,
}

export const ContextMenu: FunctionComponent<Props> = ({ movie }: Props) => {
    const [anchorContextEl, setAnchorContextEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorContextEl);
    const handleContextMenuButtonClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorContextEl(event.currentTarget);
        event.stopPropagation();
    };

    return (<ContextMenuPanel>
        <IconButton
            id="context-menu-button"
            aria-controls={open ? 'context-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleContextMenuButtonClick}
            size="small"
            color="default"
            background-color="secondary"
        >
            <MoreHorizIcon fontSize="inherit" />
        </IconButton>
        {anchorContextEl && <ContextMenuItems
            movieId={movie.id}
            anchorContextEl={anchorContextEl}
            onClose={() => setAnchorContextEl(null)}
        />}
    </ContextMenuPanel>);
};
