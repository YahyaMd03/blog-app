import { Blog } from '../types/blog';

interface Props {
    blogs: Blog[];
    onSelect: (blog: Blog) => void;
}

const BlogTable = ({ blogs, onSelect }: Props) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <table
            style={{
                width: '100%',
                borderCollapse: 'collapse',
                border: '1px solid #F3F3F3',
            }}
        >
            <thead style={{ backgroundColor: '#F3F3F3' }}>
                <tr>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Cover Image</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Launch Date</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Title</th>
                    <th style={{ padding: '12px', textAlign: 'left' }}>Author</th>
                </tr>
            </thead>
            <tbody>
                {blogs.map((blog, idx) => (
                    <tr
                        key={idx}
                        style={{
                            borderBottom: '2px solid #F3F3F3',
                            transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLTableRowElement).style.backgroundColor = '#f9f9f9';
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLTableRowElement).style.backgroundColor = 'transparent';
                        }}
                    >
                        <td style={{ padding: '12px', textAlign: 'left' }}>
                            <img src={blog.image_lnk} alt="cover" width={50} />
                        </td>
                        <td style={{ padding: '12px', textAlign: 'left', color: 'var(--color-font-secondary)' }}>
                            {formatDate(blog.launchdate)}
                        </td>
                        <td
                            style={{
                                padding: '12px',
                                textAlign: 'left',
                                color: 'var(--color-blue)',
                                cursor: 'pointer',
                            }}
                            onClick={() => onSelect(blog)}
                        >
                            {blog.title}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'left' }}>
                            {blog.author}
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
};

export default BlogTable;
