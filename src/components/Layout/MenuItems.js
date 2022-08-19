import React from 'react'
import styles from "./Layout.module.css";
import { Link } from 'react-router-dom';

//burada direkt olarak array vermemizin sebebi array prototyplarini kullanabilmektir.
//uyari : fonksiyon seklinde degistirilmesi halinde layout icerisindeki array prototypleri calismayacaktir.
export default [
    <Link to='/NewsAdmin' id='2' className={styles.menuitem}>Haberler Admin</Link>,
    <Link to='/NewsUser' id='2' className={styles.menuitem}>Haberler Kullanıcı</Link>,

    <Link to='/AnnouncementsAdmin' id='1' className={styles.menuitem}>Duyurular Admin</Link>,
    <Link to='/AnnouncementsUser' id='1' className={styles.menuitem}>Duyurular Kullanıcı</Link>,



]