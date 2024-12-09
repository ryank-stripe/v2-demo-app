import React from 'react';

import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';


import JSONPretty from 'react-json-pretty';

export function ResponseAccordian(props) {
    const [expanded, setExpanded] = React.useState(true);

    const handleExpansion = () => {
      setExpanded((prevExpanded) => !prevExpanded);
    };
  
    return (
        <Accordion
            expanded={expanded}
            onChange={handleExpansion}
            slots={{ transition: Fade }}
            slotProps={{ transition: { timeout: 400 } }}
            sx={[
                expanded
                    ? {
                        [`& .${accordionClasses.region}`]: {
                        height: 'auto',
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                        display: 'block',
                        },
                    }
                    : {
                        [`& .${accordionClasses.region}`]: {
                        height: 0,
                        },
                        [`& .${accordionDetailsClasses.root}`]: {
                        display: 'none',
                        },
                    },
                ]
            }
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography>Response</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {
                    props.body !== null
                        ? <JSONPretty id="json-pretty" data={props.body}></JSONPretty>
                        : <CircularProgress />
                }
            </AccordionDetails>
        </Accordion>
    )
}