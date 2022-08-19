import React, { useState } from 'react'
import Layout from '../../Layout/Layout'

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useEffect } from 'react'
import styles from './announcementuser.module.css'
import { DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useSelector } from "react-redux";
import DialogContent from '@mui/material/DialogContent';

const AnnouncementUser = () => {

    const [open, setOpen] = React.useState(false);
    const announcements = useSelector((state) => state.announcements.announcements);

    const [postFullArray, setAnnouncementFullArray] = useState([])
    const [listArray, setListArray] = useState()
    const [selectedAnnouncement, setSelectedAnnouncement] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };

    useEffect(() => {

        announcements.length > 0 &&
            announcements.map((announcement) => (

                setAnnouncementFullArray([...postFullArray, announcement])
            ))
    }, [announcements])

    useEffect(() => {
        console.log("AnnouncementFullArray", postFullArray)

        setListArray(uniqByKeepLast(postFullArray, it => it.id))

    }, [postFullArray])

    const handleDetails = (row) => {
        console.log("Row : ", row)
        setSelectedAnnouncement(row)
        handleClickOpen()
    }

    function uniqByKeepLast(a, key) {
        return [
            ...new Map(
                a.map(x => [key(x), x])
            ).values()
        ]
    }

    return (
        <>
            <Layout />
            <div className={styles.container}>

                {/* Bu alan Listeleme up için */}
                <div className={styles.form}>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 850, backgroundColor: "whitesmoke" }} aria-label="simple table">
                            <TableHead sx={{ backgroundColor: "Gray" ,color:"white"}}>
                                <TableRow>
                                    <TableCell align="right">Id</TableCell>
                                    <TableCell align="right">Announcement Title&nbsp;</TableCell>
                                    <TableCell align="right">Announcement Subject&nbsp;</TableCell>
                                    <TableCell align="right">Announcement Content&nbsp;</TableCell>
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
                                        <TableCell align="right">{row.announcementtitle}</TableCell>
                                        <TableCell align="right">{row.announcementsubject}</TableCell>
                                        <TableCell align="right">{row.announcementcontent}</TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>        </>
    )
}

export default AnnouncementUser