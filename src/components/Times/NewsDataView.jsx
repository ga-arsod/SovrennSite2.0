import matter from 'gray-matter';
import { useEffect, useState } from 'react'
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import convertToHtml from '@/utils/convertToHtml';

import Link from 'next/link';
import styles from "../../styles/NewsData.module.css"

const NewsDataView = ({data, isAuth, discovery_route,prime_route }) => {
    const [newsData, setNewsData] = useState("");
    const [tables, setTables] = useState("");

   

    

    const setTablesFun = async (table) => {
        let tableStr = "";

        for (let i = 0; i < table?.length; i++) {
            const matterResult = matter(table[i]);

            const processedContent = await remark()
                .use(remarkGfm)
                .use(html)
                .process(matterResult.content);

            const data = processedContent.toString();

            tableStr += data;
        };

        setTables(tableStr);
    };
console.log(convertToHtml(data.content))
    return (
        <article id={styles.MainContainer} >

            <div className={styles.titleDiv}>
                <h2 className={styles.titleDivBtnsHeading}>{data.company_name}</h2>

                <div className={styles.titleDivBtns} >
                    {discovery_route ?
                        <Link className={styles.discoveryRouteBtn} href={discovery_route} target='_blank'>Read Discovery</Link>
                        :
                        ""}

                    {prime_route ?
                        <Link className={styles.discoveryRouteBtn} href={prime_route} target='_blank'>Read Prime</Link>
                        :
                        ""}
                </div>
            </div>

           
            <div id={styles.contentDiv}>{convertToHtml(data.content)}</div>
            {/* <div dangerouslySetInnerHTML={{ __html: tables }} className={styles.tablesDiv} /> */}

        </article>

    );
};

export default NewsDataView