import { Blog } from '../types/blog';
import closeIcon from '../assets/close-icon.png';

interface Props {
    blog: Blog;
    onClose: () => void;
}

const BlogModal = ({ blog, onClose }: Props) => {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 999,
        }}>
            <div style={{
                backgroundColor: '#fff',
                padding: '24px',
                width: '500px',
                borderRadius: '8px',
                position: 'relative',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Description</h2>
                    <img
                        src={closeIcon}
                        alt="close"
                        onClick={onClose}
                        style={{ cursor: 'pointer', width: '24px' }}
                    />
                </div>
                <p style={{ marginTop: '12px' }}>{blog.description}</p>
            </div>
        </div>
    );
};

export default BlogModal;
