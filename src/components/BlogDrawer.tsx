import React, { useState } from 'react';
import { Blog } from '../types/blog';
import closeIcon from '../assets/close-icon.png';

interface Props {
    onClose: () => void;
    onSubmit: (blog: Blog) => void;
}

const BlogDrawer = ({ onClose, onSubmit }: Props) => {
    const [formData, setFormData] = useState<Blog>({
        id: 0,
        title: '',
        launchdate: '',
        author: '',
        image_lnk: '',
        description: '',
        token: '',
        entry_date: '',
    });

    const [touched, setTouched] = useState<Partial<Record<keyof Blog, boolean>>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const validate = () =>
        formData.title.trim() &&
        formData.launchdate &&
        formData.author.trim() &&
        formData.image_lnk.trim() &&
        formData.description.trim();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        if (validate()) {
            onSubmit(formData);
        }
    };

    const getError = (field: keyof Blog) =>
        submitted || touched[field]
            ? typeof formData[field] === 'string' && !formData[field].trim()
                ? '1px solid red'
                : '1px solid #ccc'
            : '1px solid #ccc';

    return (
        <div
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                borderTop: '2px solid #ccc',
                padding: '24px',
                zIndex: 999,
            }}
            role="dialog"
            aria-labelledby="add-blog-heading"
            aria-modal="true"
            className='animate-slideUp'
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '24px',
                }}
            >
                <h2 id="add-blog-heading">Add New Blog</h2>
                <img
                    src={closeIcon}
                    alt="Close"
                    onClick={onClose}
                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                    aria-label="Close"
                />
            </div>

            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '24px',
                    }}
                >
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        {(['title', 'launchdate', 'author', 'image_lnk'] as (keyof Blog)[]).map((field) => (
                            <input
                                key={field}
                                type={field === 'launchdate' ? 'date' : 'text'}
                                name={field}
                                aria-label={field}
                                placeholder={field === 'launchdate' ? '' : field.replace('_', ' ')}
                                value={formData[field] as string}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    height: '48px',
                                    marginBottom: '12px',
                                    border: getError(field),
                                    padding: '8px',
                                }}
                                required
                            />
                        ))}

                    </div>

                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <textarea
                            name="description"
                            aria-label="Description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={9}
                            style={{
                                width: '100%',
                                height: '204px',
                                border: getError('description'),
                                padding: '8px',
                            }}
                            required
                        />
                    </div>
                </div>

                <div style={{ textAlign: 'right', marginTop: '24px' }}>
                    <button type="submit" className="btn btn-green">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogDrawer;
