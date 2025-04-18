import { useEffect, useState, useOptimistic, startTransition } from 'react';
import { Blog } from './types/blog';
import BlogTable from './components/BlogTable';
import BlogModal from './components/BlogModal';
import BlogDrawer from './components/BlogDrawer';

const LIBRARY_API = 'http://demo.api.admin.circlesnow.com/ProductRESTService.svc/getschedmsg';

export default function Library() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [optimisticBlogs, addOptimisticBlog] = useOptimistic(blogs, (state, newBlog: Blog) => [
    newBlog,
    ...state,
  ]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(LIBRARY_API, {
        headers: {
          token: 'yahyamd97@gmail.com',
        },
      });
      const data = await res.json();
      const parsedBlogs = JSON.parse(data.dt);

      const normalizedBlogs = parsedBlogs.map((blog: Blog) => ({
        ...blog,
        image_lnk: blog.image_lnk,
      }));

      setBlogs(normalizedBlogs);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (newBlog: Blog) => {
    setIsDrawerOpen(false);

    startTransition(() => {
      addOptimisticBlog(newBlog);
    });

    try {
      const res = await fetch('http://demo.api.admin.circlesnow.com/ProductRESTService.svc/schedMsg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: 'yahyamd97@gmail.com',
        },
        body: JSON.stringify({
          title: newBlog.title,
          launchdate: newBlog.launchdate,
          author: newBlog.author,
          image_link: newBlog.image_lnk,
          description: newBlog.description,
        }),
      });

      const result = await res.json();

      if (result.Status === "1") {
        fetchBlogs();
      } else {
        alert("Blog Insert Failed")
        console.error('Blog insert failed:', result.Message);
      }
    } catch (err) {
      alert(`Blog Insert Failed - ${err}`)
    }
  };



  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div
      style={{
        maxWidth: '960px',
        margin: '84px auto 120px',
        padding: '0 16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <h1>Library</h1>
        <div style={{ marginTop: 'auto' }}>
          <button className="btn btn-green" onClick={() => setIsDrawerOpen(true)}>
            New blog
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p>Loading blogs...</p>
        </div>
      ) : (
        <BlogTable blogs={optimisticBlogs} onSelect={setSelectedBlog} />
      )}

      {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}

      {isDrawerOpen && <BlogDrawer onClose={() => setIsDrawerOpen(false)} onSubmit={handleSubmit} />}
    </div>
  );
}
