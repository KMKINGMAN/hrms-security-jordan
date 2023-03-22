// import  from '@material-ui/icons/Close';
import React from 'react'
import { Dialog, DialogContent, DialogTitle, Box, Typography, Button } from '@mui/material';
import Iconify from '../../components/iconify';


const CreateEmployeeDialog = ({ title, children, dialogStatus, setDialogStatus }) => {
    return (
        <Dialog
            open={dialogStatus}
            maxWidth="md"
            PaperProps={{ style: { borderRadius: "5" } }}
        >
            <DialogTitle display={"grid"} gridTemplateColumns="repeat(2, minmax(0, 1fr))">
                <Typography gridColumn={"span 1"} variant="h6" component={Box} style={{ flexGrow: 1 }} mr={1}>{title}</Typography>
                <Button sx={{ gridColumn: "span 1" }}
                    color="secondary"
                    onClick={() => { setDialogStatus(false) }}
                ><Iconify icon={"ri:close-circle-line"} />
                </Button>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>

        </Dialog>
    )
}

export default CreateEmployeeDialog;