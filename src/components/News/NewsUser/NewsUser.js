import React, { useState } from 'react'
import Layout from '../../Layout/Layout'

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useEffect } from 'react'
import styles from './newsuser.module.css'
import { DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from "react-redux";
import DialogContent from '@mui/material/DialogContent';

const NewsUser = () => {

    const [open, setOpen] = React.useState(false);
    const posts = useSelector((state) => state.posts.posts);

    const [postFullArray, setPostFullArray] = useState([])
    const [listArray, setListArray] = useState()
    const [selectedNews, setSelectedNews] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {

        posts.length > 0 &&
            posts.map((post) => (

                setPostFullArray([...postFullArray, post])
            ))
    }, [posts])

    useEffect(() => {
        console.log("PostFullArray", postFullArray)

        setListArray(uniqByKeepLast(postFullArray, it => it.id))

    }, [postFullArray])

    const handleDetails = (row) => {
        console.log("Row : ", row)
        setSelectedNews(row)
        handleClickOpen()
    }

    function uniqByKeepLast(a, key) {
        return [
            ...new Map(
                a.map(x => [key(x), x])
            ).values()
        ]
    }

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        X
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };
    return (
        <>
            <Layout />
            <div className={styles.container}>
                {/* Bu alan Pop up için */}
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Haber Detayı   .        .
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            {selectedNews?.newstitle}
                        </Typography>
                        <Typography gutterBottom>
                            {selectedNews?.newssubject}
                        </Typography>
                        <Typography gutterBottom>
                            {selectedNews?.newscontent}
                        </Typography>
                    </DialogContent>

                </BootstrapDialog>
                {/* Bu alan Listeleme up için */}
                <div className={styles.form}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 850, backgroundColor: "whitesmoke" }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: "Gray", color: "white" }}>
                                <TableRow>
                                    <TableCell align="right">Id</TableCell>
                                    <TableCell align="right">News Title&nbsp;</TableCell>
                                    <TableCell align="right">News Subject&nbsp;</TableCell>
                                    <TableCell align="right">News Content&nbsp;</TableCell>
                                    <TableCell></TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listArray?.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{row.id}</TableCell>
                                        <TableCell align="right">{row.newstitle}</TableCell>
                                        <TableCell align="right">{row.newssubject}</TableCell>
                                        <TableCell align="right">{row.newscontent}</TableCell>
                                        <TableCell align="right">{<Button onClick={() => handleDetails(row)} >Detaylar</Button>}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>        </>
    )
}

export default NewsUser