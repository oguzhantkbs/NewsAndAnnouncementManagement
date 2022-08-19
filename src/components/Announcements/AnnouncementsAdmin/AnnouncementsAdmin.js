import React, { useEffect, useState } from 'react'
import styles from './announcementadmin.module.css'
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, DialogTitle, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { createAnnouncement, deleteAnnouncement } from '../../../acitons/announcement';
import Autocomplete from '@mui/material/Autocomplete';
import { updateAnnouncement } from '../../../acitons/announcement';
import Layout from '../../Layout/Layout';



const AnnouncementAdmin = () => {

    const dispatch = useDispatch();
    const [select, setSelect] = useState(0)
    const [buttonText, setButtonText] = useState("")
    const [announcementArray, setAnnouncementArray] = useState([])
    const announcements = useSelector((state) => state.announcements.announcements);
    const [announcementFullArray, setAnnouncementFullArray] = useState([])
    const [announcementFullArray2, setAnnouncementFullArray2] = useState([])
    const [selectedId, setSelectedId] = useState()
    const [listArray, setListArray] = useState()


    useEffect(() => {
        switch (select) {
            case 0:
                setButtonText("Create")
                break;
            case 1:
                setButtonText("Ekle")
                console.log("Ekle")
                break;
            case 2:
                setButtonText("Güncelle")
                console.log("güncelle")

                break;
            case 3:
                setButtonText("Sil")
                console.log("sil")

                break;
        }
    }, [select])

    const removeAnnouncement = () => {
        dispatch(deleteAnnouncement(selectedId));
    };

    const handleAutocomplate = (e) => {
        formik.resetForm()
        console.log("e", e.target.value)
        console.log("AnnouncementFullArray", announcementFullArray)

        announcementFullArray?.map((announcement) => {
            if (announcement.announcementtitle == e.target.value) {
                console.log("selected autocomplate", announcement)
                setSelectedId(announcement.id)
                formik.values.announcementtitle = announcement.announcementtitle
                if (announcement != "" && announcement != null && announcement != undefined) {
                    // setAnnouncementFullArray2(...announcementFullArray2, announcementFullArray2.includes(announcement.id))
                    setAnnouncementFullArray2(...announcementFullArray2, announcement)
                }
            }
        })

    }

    useEffect(() => {

        announcements.length > 0 &&
            announcements.map((announcement) => (
                !announcementArray.includes(announcement.announcementtitle) ?
                    setAnnouncementArray([...announcementArray, announcement.announcementtitle]) : "",
                console.log("announcementArrayfull asdlşaskdşlk", announcementFullArray2),
                // setAnnouncementFullArray2([...announcementFullArray2, announcement]),
                setAnnouncementFullArray([...announcementFullArray, announcement])
            ))
    }, [announcements])

    useEffect(() => {
        console.log("AnnouncementArray", announcementArray)
        console.log("AnnouncementFullArray", announcementFullArray)

        const rows = [
            announcementFullArray.map((announcement) => (
                createData(announcement.id, announcement.announcementtitle, announcement.announcementsubject, announcement.announcementcontent))
            )
        ];

        setListArray(uniqByKeepLast(announcementFullArray, it => it.id))


    }, [announcementArray, announcementFullArray, announcementFullArray2])

    function createData(id, announcementtitle, announcementsubject, announcementcontent) {
        return { id, announcementtitle, announcementsubject, announcementcontent };
    }

    function uniqByKeepLast(a, key) {
        return [
            ...new Map(
                a.map(x => [key(x), x])
            ).values()
        ]
    }

    const formik = useFormik({
        initialValues: {
            id: "",
            announcementtitle: "",
            announcementsubject: "",
            announcementcontent: "",
        },

        //validationSchema: schema,
        onSubmit: (values) => {

            switch (select) {


                case 1:
                    values.id = Date.now()
                    console.log("values create : ", values)
                    dispatch(createAnnouncement({ ...values, id: values.id, announcementtitle: values.announcementtitle, announcementsubject: values.announcementsubject, announcementcontent: values.announcementcontent }))

                    setButtonText("Eklendi") // button text eklendi olarak değişiyor
                    setSelect(0)

                        .catch((error) => {
                            console.log("error", error?.response.data);

                        })
                        .finally(() => {
                            formik.resetForm({});

                        });
                    break;
                case 2:
                    // let myid = announcementFullArray2.id
                    console.log("Update Values ", values)
                    dispatch(updateAnnouncement({ id: selectedId, announcementtitle: values.announcementtitle, announcementsubject: values.announcementsubject, announcementcontent: values.announcementcontent }))

                    setButtonText("Güncellendi") // button text eklendi olarak değişiyor
                    // setAnnouncementFullArray(uniqByKeepLast(announcementFullArray, it => it.id))

                    setSelect(0)
                        .catch((error) => {
                            console.log("error", error?.response.data);

                        })
                        .finally(() => {
                            formik.resetForm({});

                        });
                    break;
                case 3:
                    // dispatch(createAnnouncement({ ...values, announcementtitle: values.announcementtitle, announcementsubject: values.announcementsubject, announcementcontent: values.announcementcontent }))

                    setButtonText("Silindi") // button text eklendi olarak değişiyor
                    removeAnnouncement()
                    setSelect(0)
                    setAnnouncementFullArray([announcements])


                        .catch((error) => {
                            console.log("error", error?.response.data);

                        })
                        .finally(() => {
                            formik.resetForm({});

                        });
                    break;

                default:
                    break;
            }
        },
    });


    switch (select) {

        case 0:
            return (
                <>
                    <Layout />


                    <div className={styles.container}>

                        {/* Bu alan Listeleme up için */}
                        <div className={styles.form}>
                            <div className={styles.topbuttons}>
                                <Button className={styles.button} onClick={() => setSelect(0)}>Duyuru Listele</Button>
                                <Button className={styles.button} onClick={() => setSelect(1)}>Duyuru Ekle</Button>
                                <Button className={styles.button} onClick={() => setSelect(2)}>Duyuru Güncelle</Button>
                                <Button className={styles.button} onClick={() => setSelect(3)}>Duyuru Sil</Button>
                            </div>


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 850, backgroundColor: "whitesmoke" }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "Gray" }}>
                                        <TableRow >
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
                                                key={row.id}
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
                    </div>

                </>
            )
            break;

        case 1:
            return (
                <>
                    <Layout />

                    <div className={styles.container}>

                        <form className={styles.form} onSubmit={formik.handleSubmit}>

                            <Button onClick={() => setSelect(0)}>Duyuru Listele</Button>
                            <Button onClick={() => setSelect(1)}>Duyuru Ekle</Button>
                            <Button onClick={() => setSelect(2)}>Duyuru Güncelle</Button>
                            <Button onClick={() => setSelect(3)}>Duyuru Sil</Button>

                            <div className={styles.formitems}>

                                <TextField
                                    width="100%"
                                    id="announcementtitle"
                                    placeholder="Duyuru başlığı yazınız."
                                    name="announcementtitle"
                                    onChange={formik.handleChange}
                                    value={formik.values.announcementtitle}

                                />
                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="announcementsubject"
                                    placeholder="Duyuru konusu yazınız."
                                    name="announcementsubject"
                                    onChange={formik.handleChange}
                                    value={formik.values.announcementsubject == "" ? formik.values.announcementsubject : formik.values.announcementsubject}
                                />
                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="announcementcontent"
                                    placeholder="Duyuru içeriği yazınız."
                                    name="announcementcontent"
                                    onChange={formik.handleChange}
                                    value={formik.values.announcementcontent}
                                    multiline rows={5}
                                />
                                <div style={{ height: "10px" }} />
                                <Button variant="contained" type='submit' sx={{ background: "gray" }}>{buttonText}</Button>

                            </div>
                        </form>
                    </div>
                </>
            )
            break;

        case 2:

            return (
                <>
                    <Layout />

                    <div className={styles.container}>

                        <form className={styles.form} onSubmit={formik.handleSubmit}>

                            <Button onClick={() => setSelect(0)}>Duyuru Listele</Button>
                            <Button onClick={() => { setSelect(1) }}>Duyuru Ekle</Button>
                            <Button onClick={() => { setSelect(2) }}>Duyuru Güncelle</Button>
                            <Button onClick={() => { setSelect(3) }}>Duyuru Sil</Button>

                            <div className={styles.formitems}>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={announcementArray}
                                    width="100%"
                                    renderInput={(params) => <TextField {...params} label="Duyuru seçiniz" />}
                                    onSelect={handleAutocomplate}
                                    value={formik.values.announcementtitle}
                                />

                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="announcementsubject"
                                    placeholder={announcementFullArray2.announcementsubject}
                                    name="announcementsubject"
                                    onChange={formik.handleChange}
                                    value={formik.values.announcementsubject}
                                />

                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="announcementcontent"
                                    placeholder={announcementFullArray2.announcementcontent}
                                    name="announcementcontent"
                                    onChange={formik.handleChange}
                                    value={formik.values.announcementcontent}
                                    multiline rows={5}
                                />
                                <div style={{ height: "10px" }} />
                                <Button variant="contained" type='submit' sx={{ background: "gray" }}>{buttonText}</Button>

                            </div>
                        </form>
                    </div>
                </>
            )
            break;

        case 3:
            return (
                <>
                    <Layout />

                    <div className={styles.container}>

                        <form className={styles.form} onSubmit={formik.handleSubmit}>

                            <Button onClick={() => setSelect(0)}>Duyuru Listele</Button>
                            <Button onClick={() => { setSelect(1) }}>Duyuru Ekle</Button>
                            <Button onClick={() => { setSelect(2) }}>Duyuru Güncelle</Button>
                            <Button onClick={() => { setSelect(3) }}>Duyuru Sil</Button>

                            <div className={styles.formitems}>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={announcementArray && announcementArray}
                                    width="100%"
                                    renderInput={(params) => <TextField {...params} label="Duyuru seçiniz" />}
                                    onSelect={handleAutocomplate}
                                    value={formik.values.announcementtitle}
                                />
                                <div style={{ height: "10px" }} />

                                <Button variant="contained" type='submit' sx={{ background: "gray" }}>{buttonText}</Button>

                            </div>
                        </form>
                    </div>
                </>
            )
            break;

        default:
            return (
                <>
                    Hello World
                </>
            )
            break;
    }

}

export default AnnouncementAdmin