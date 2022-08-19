import React, { useEffect, useState } from 'react'
import styles from './newsadmin.module.css'
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import { Button, DialogTitle, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { createPost, deletePost, fetchPosts } from '../../../acitons/post';
import Autocomplete from '@mui/material/Autocomplete';
import { updatePost } from '../../../acitons/post';
import Layout from '../../Layout/Layout';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


const NewsAdmin = () => {
    const dispatch = useDispatch();
    const [select, setSelect] = useState(0)
    const [buttonText, setButtonText] = useState("")
    const [postArray, setPostArray] = useState([])
    const posts = useSelector((state) => state.posts.posts);
    const [postFullArray, setPostFullArray] = useState([])
    const [postFullArray2, setPostFullArray2] = useState([])
    const [selectedId, setSelectedId] = useState()
    const [listArray, setListArray] = useState()
    const [open, setOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

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

    function generate(element) {
        return [0, 1, 2].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    const removePost = () => {
        dispatch(deletePost(selectedId));
    };

    const handleAutocomplate = (e) => {
        formik.resetForm()
        console.log("e", e.target.value)
        console.log("PostFullArray", postFullArray)

        postFullArray?.map((post) => {
            if (post.newstitle == e.target.value) {
                console.log("selected autocomplate", post)
                setSelectedId(post.id)
                formik.values.newstitle = post.newstitle
                if (post != "" && post != null && post != undefined) {
                    // setPostFullArray2(...postFullArray2, postFullArray2.includes(post.id))
                    setPostFullArray2(...postFullArray2, post)
                }
            }
        })

    }
    const handleDetails = (row) => {
        console.log("Row : ", row)
        setSelectedNews(row)
        handleClickOpen()
    }

    useEffect(() => {

        posts.length > 0 &&
            posts.map((post) => (
                !postArray.includes(post.newstitle) ?
                    setPostArray([...postArray, post.newstitle]) : "",
                console.log("postArrayfull asdlşaskdşlk", postFullArray2),
                // setPostFullArray2([...postFullArray2, post]),
                setPostFullArray([...postFullArray, post])
            ))
    }, [posts])

    useEffect(() => {
        console.log("PostArray", postArray)
        console.log("PostFullArray", postFullArray)

        const rows = [
            postFullArray.map((post) => (
                createData(post.id, post.newstitle, post.newssubject, post.newscontent))
            )
        ];

        setListArray(uniqByKeepLast(postFullArray, it => it.id))


    }, [postArray, postFullArray, postFullArray2])

    function createData(id, newstitle, newssubject, newscontent) {
        return { id, newstitle, newssubject, newscontent };
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
            newstitle: "",
            newssubject: "",
            newscontent: "",
        },

        //validationSchema: schema,
        onSubmit: (values) => {

            switch (select) {


                case 1:
                    values.id = Date.now()
                    console.log("values create : ", values)
                    dispatch(createPost({ ...values, id: values.id, newstitle: values.newstitle, newssubject: values.newssubject, newscontent: values.newscontent }))

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
                    // let myid = postFullArray2.id
                    console.log("Update Values ", values)
                    dispatch(updatePost({ id: selectedId, newstitle: values.newstitle, newssubject: values.newssubject, newscontent: values.newscontent }))

                    setButtonText("Güncellendi") // button text eklendi olarak değişiyor
                    // setPostFullArray(uniqByKeepLast(postFullArray, it => it.id))

                    setSelect(0)
                        .catch((error) => {
                            console.log("error", error?.response.data);

                        })
                        .finally(() => {
                            formik.resetForm({});

                        });
                    break;
                case 3:
                    // dispatch(createPost({ ...values, newstitle: values.newstitle, newssubject: values.newssubject, newscontent: values.newscontent }))

                    setButtonText("Silindi") // button text eklendi olarak değişiyor
                    removePost()
                    setSelect(0)
                    setPostFullArray([posts])


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
                            <Button onClick={() => setSelect(0)}>Haber Listele</Button>
                            <Button onClick={() => setSelect(1)}>Haber Ekle</Button>
                            <Button onClick={() => setSelect(2)}>Haber Güncelle</Button>
                            <Button onClick={() => setSelect(3)}>Haber Sil</Button>


                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 850, backgroundColor: "whitesmoke" }} aria-label="simple table">
                                    <TableHead sx={{ backgroundColor: "Gray" }}>
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
                                                key={row.id}
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

                            <Button onClick={() => setSelect(0)}>Haber Listele</Button>
                            <Button onClick={() => setSelect(1)}>Haber Ekle</Button>
                            <Button onClick={() => setSelect(2)}>Haber Güncelle</Button>
                            <Button onClick={() => setSelect(3)}>Haber Sil</Button>

                            <div className={styles.formitems} >

                                <TextField
                                    width="100%"
                                    id="newstitle"
                                    placeholder="Haber başlığı yazınız."
                                    name="newstitle"
                                    onChange={formik.handleChange}
                                    value={formik.values.newstitle}

                                />
                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="newssubject"
                                    placeholder="Haber konusu yazınız."
                                    name="newssubject"
                                    onChange={formik.handleChange}
                                    value={formik.values.newssubject == "" ? formik.values.newssubject : formik.values.newssubject}
                                />
                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="newscontent"
                                    placeholder="Haber içeriği yazınız."
                                    name="newscontent"
                                    onChange={formik.handleChange}
                                    value={formik.values.newscontent}
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

                            <Button onClick={() => setSelect(0)}>Haber Listele</Button>
                            <Button onClick={() => { setSelect(1) }}>Haber Ekle</Button>
                            <Button onClick={() => { setSelect(2) }}>Haber Güncelle</Button>
                            <Button onClick={() => { setSelect(3) }}>Haber Sil</Button>

                            <div className={styles.formitems}>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={postArray}
                                    width="100%"
                                    renderInput={(params) => <TextField {...params} label="Haber seçiniz" />}
                                    onSelect={handleAutocomplate}
                                    value={formik.values.newstitle}
                                />

                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="newssubject"
                                    placeholder={postFullArray2.newssubject}
                                    name="newssubject"
                                    onChange={formik.handleChange}
                                    value={formik.values.newssubject}
                                />

                                <div style={{ height: "10px" }} />
                                <TextField
                                    width="100%"
                                    id="newscontent"
                                    placeholder={postFullArray2.newscontent}
                                    name="newscontent"
                                    onChange={formik.handleChange}
                                    value={formik.values.newscontent}
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

                            <Button onClick={() => setSelect(0)}>Haber Listele</Button>
                            <Button onClick={() => { setSelect(1) }}>Haber Ekle</Button>
                            <Button onClick={() => { setSelect(2) }}>Haber Güncelle</Button>
                            <Button onClick={() => { setSelect(3) }}>Haber Sil</Button>

                            <div className={styles.formitems}>

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={postArray && postArray}
                                    width="100%"
                                    renderInput={(params) => <TextField {...params} label="Haber seçiniz" />}
                                    onSelect={handleAutocomplate}
                                    value={formik.values.newstitle}
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

export default NewsAdmin