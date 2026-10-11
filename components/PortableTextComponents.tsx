import React from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanityClient';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

export const portableTextComponents = {
    block: {
        h2: ({ children }: any) => (
            <h2
                style={{
                    fontSize: '1.8rem',
                    color: '#2d5a27',
                    borderLeft: '5px solid #2d5a27',
                    paddingLeft: '12px',
                    marginTop: '45px',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    lineHeight: '1.4',
                }}
            >
                {children}
            </h2>
        ),

        h3: ({ children }: any) => (
            <h3
                style={{
                    fontSize: '1.4rem',
                    color: '#333',
                    borderBottom: '1px solid #ddd',
                    paddingBottom: '8px',
                    marginTop: '35px',
                    marginBottom: '15px',
                    fontWeight: 'bold',
                    lineHeight: '1.4',
                }}
            >
                {children}
            </h3>
        ),

        normal: ({ children }: any) => (
            <p style={{ marginBottom: '24px' }}>
                {children}
            </p>
        ),
    },

    types: {
        image: ({ value }: any) => (
            <div
                style={{
                    margin: '20px 0',
                    textAlign: 'center',
                }}
            >
                <img
                    src={urlFor(value).url()}
                    alt={value.alt || 'Content Image'}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px',
                    }}
                />

                {value.caption && (
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#666',
                        }}
                    >
                        {value.caption}
                    </p>
                )}
            </div>
        ),

        // Sanity Table
        table: ({ value }: any) => {
            const rows = value.rows || [];

            if (rows.length === 0) return null;

            return (
                <div
                    style={{
                        overflowX: 'auto',
                        margin: '30px 0',
                    }}
                >
                    <table
                        style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.95rem',
                            lineHeight: '1.6',
                        }}
                    >
                        <thead>
                            <tr>
                                {rows[0].cells.map((cell: string, index: number) => (
                                    <th
                                        key={index}
                                        style={{
                                            padding: '12px',
                                            border: '1px solid #ddd',
                                            backgroundColor: '#f0f5ef',
                                            color: '#2d5a27',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {cell}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {rows.slice(1).map((row: any, rowIndex: number) => (
                                <tr key={rowIndex}>
                                    {row.cells.map((cell: string, cellIndex: number) => (
                                        <td
                                            key={cellIndex}
                                            style={{
                                                padding: '12px',
                                                border: '1px solid #ddd',
                                                backgroundColor:
                                                    rowIndex % 2 === 0 ? '#fff' : '#fafafa',
                                                fontWeight:
                                                    rowIndex === rows.length - 2
                                                        ? 'bold'
                                                        : 'normal',
                                            }}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        },
    },
};