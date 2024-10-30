import React from 'react';

const convertToHTML = (blocks) => {
    return blocks.map((block, index) => {
        switch (block.type) {
            case 'table':
                return (
                    <table key={index}>
                        <thead>
                            <tr>
                                {block.data.content[0].map((header, headerIndex) => (
                                    <th key={headerIndex}>{renderTableCell(header)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.data.content.slice(1).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{renderTableCell(cell)}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                );

            case 'header':
                return React.createElement(`h${block.data.level}`, { key: index }, block.data.text);

            case 'paragraph':
                return <p key={index}>{renderHTMLContent(block.data.text)}</p>;

            case 'list':
                return block.data.style === 'ordered' ? (
                    <ol key={index}>
                        {block.data.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{renderHTMLContent(item)}</li>
                        ))}
                    </ol>
                ) : (
                    <ul key={index}>
                        {block.data.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{renderHTMLContent(item)}</li>
                        ))}
                    </ul>
                );

            case 'b':
                return <strong key={index}>{renderHTMLContent(block.data.text)}</strong>;

            case 'underline':
                return <u key={index}>{renderHTMLContent(block.data.text)}</u>;

            case 'image':
                return <img key={index} src={block.data.file.url} alt={block.data.caption || "image"} />;

            case 'link':
                return <a key={index} href={block.data.href}>{renderHTMLContent(block.data.text)}</a>;

            case 'button':
                return <button key={index}>{renderHTMLContent(block.data.text)}</button>;

            case 'marker':
                return <mark key={index}>{renderHTMLContent(block.data.text)}</mark>;

            default:
                return null;
        }
    });
};



const renderHTMLContent = (content) => {
    // Check if the content is a string, if so, render it as HTML
    if (typeof content === 'string') {
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    // If not a string, render the content as is
    return content;
};

const renderTableCell = (cellContent) => {
    return renderHTMLContent(cellContent);
};

export default convertToHTML;