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
                return <p key={index}>{renderHTMLContentWithFirstWordHighlight(block.data.text)}</p>;

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

// Function to wrap the first word in a <span> with class "highlight"
const renderHTMLContentWithFirstWordHighlight = (content) => {
    if (typeof content === 'string') {
        const words = content.split(' ');
        const firstWord = words[0]; // Get the first word
        const restOfText = words.slice(1).join(' '); // Join the remaining words back

        return (
            <span>
                <span className="highlight">{firstWord}</span> {restOfText}
            </span>
        );
    }

    return content;
};

const renderHTMLContent = (content) => {
    if (typeof content === 'string') {
        return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
    return content;
};

const renderTableCell = (cellContent) => {
    return renderHTMLContent(cellContent);
};

export default convertToHTML;