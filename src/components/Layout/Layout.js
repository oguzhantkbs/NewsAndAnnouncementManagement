import { useEffect, useState } from "react";
import styles from "./Layout.module.css";
import MenuItems from "./MenuItems";
import React from 'react';

export default function Layout() {
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        //auth islemleri burada yapiliyor. cookie uzerinden gelen auth ile menu itemlari birbiriyle esitleniyor
        let menuArr = [];

        MenuItems.forEach((menu) => {
            menuArr.push(menu);
        });

        menuArr.sort()

        setMenuList(menuArr);
    }
        , [])

    return (
        <>
            <div className={styles.menucontainer}>
                <div className={styles.menu}>

                    {
                        <div className={styles.menuarea}>

                            {menuList && menuList.map((item) => {
                                return React.cloneElement(item, {
                                    className: styles.item
                                })
                            })}
                        </div>

                    }

                </div>
            </div>

        </>

    );

}