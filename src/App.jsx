import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Portfolio', id: 'portfolio' },
  { name: 'Contact', id: 'contact' },
];

export default function App() {
  const [active, setActive] = useState('home');
  // Mock role (replace with real auth later)
  const [isAdmin] = useState(true); // set to false for user

  return (
    <div className="min-h-screen bg-cream text-primary font-sans">
      <nav className="flex items-center justify-between px-8 py-4 shadow-sm bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="text-2xl font-bold tracking-wide">Almeera Project</div>
        <div className="flex gap-6">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`text-lg font-medium transition-colors duration-200 hover:text-accent ${active === item.id ? 'text-accent' : ''}`}
              onClick={() => setActive(item.id)}
            >
              {item.name}
            </button>
          ))}
          {isAdmin && (
            <button
              className={`text-lg font-medium transition-colors duration-200 hover:text-gold ${active === 'admin' ? 'text-gold' : ''}`}
              onClick={() => setActive('admin')}
            >
              Admin Settings
            </button>
          )}
        </div>
      </nav>
      <main className="p-8">
        <AnimatePresence mode="wait">
          {active === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center py-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Modern Interior, Exterior, and Real Estate Design</h1>
              <p className="text-xl text-accent mb-8">Transforming spaces with creativity and precision. Discover our portfolio and services.</p>
            </motion.section>
          )}
          {active === 'about' && (
            <motion.section
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto py-16"
            >
              <h2 className="text-3xl font-semibold mb-4">About Almeera Project</h2>
              <p className="text-lg text-accent">We specialize in interior, exterior, and real estate design, delivering digital assets that inspire and impress. Our team combines modern aesthetics with functional solutions for every project.</p>
            </motion.section>
          )}
          {active === 'portfolio' && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <PortfolioSection isAdmin={isAdmin} />
            </motion.div>
          )}
          {active === 'contact' && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl mx-auto py-16 text-center"
            >
              <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
              <p className="text-lg text-accent mb-8">Have a project in mind? Reach out to us for collaboration or inquiries.</p>
              <a
                href="https://wa.me/6285252108850"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-colors text-lg font-semibold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c0 5.385 4.365 9.75 9.75 9.75 1.7 0 3.29-.425 4.68-1.17l3.82 1.02-1.02-3.82A9.708 9.708 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12z" />
                </svg>
                Contact Admin
              </a>
            </motion.section>
          )}
          {active === 'admin' && isAdmin && (
            <motion.section
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto py-16 text-center"
            >
              <h2 className="text-3xl font-semibold mb-4">Admin Settings</h2>
              <div className="text-lg text-accent">[Admin controls for managing portfolio content will appear here]</div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function PortfolioSection({ isAdmin }) {
  const TABS = [
    { label: 'Photo', id: 'photo' },
    { label: 'Video', id: 'video' },
    { label: '3D Tour', id: '3d' },
    { label: 'PDF Floor Plan', id: 'pdf' },
  ];
  const [activeTab, setActiveTab] = useState('photo');
  // Mock portfolio data
  const [portfolio, setPortfolio] = useState({
    photo: [
      { id: 1, title: 'Modern Living Room', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', type: 'image' },
    ],
    video: [
      { id: 1, title: 'Luxury Villa Tour', url: 'https://www.youtube.com/embed/5MgBikgcWnY', type: 'video' },
    ],
    '3d': [
      { id: 1, title: '3D Apartment Walkthrough', url: 'https://my.matterport.com/show/?m=XXXXXXXXXXX', type: '3d' },
    ],
    pdf: [
      { id: 1, title: 'Sample Floor Plan', url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', type: 'pdf' },
    ],
  });
  // Admin add/edit/delete (mocked)
  function handleAdd(tab) {
    const newItem = window.prompt(`Enter new ${tab} title:`);
    if (newItem) {
      setPortfolio(prev => ({
        ...prev,
        [tab]: [...prev[tab], { id: Date.now(), title: newItem, url: '', type: tab }],
      }));
    }
  }
  function handleDelete(tab, id) {
    setPortfolio(prev => ({
      ...prev,
      [tab]: prev[tab].filter(item => item.id !== id),
    }));
  }
  return (
    <section className="max-w-4xl mx-auto py-16">
      <h2 className="text-3xl font-semibold mb-6">Portfolio: Digital Pro Packages</h2>
      <p className="text-lg text-accent mb-8">Discover the quality, precision, and stunning beauty of the media assets included as part of our complete Digital Pro package.</p>
      <div className="flex gap-4 mb-8 justify-center">
        {TABS.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full font-medium transition-colors duration-200 border border-primary/20 ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-white text-primary hover:bg-accent hover:text-white'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow p-8 min-h-[200px]"
      >
        {portfolio[activeTab].length === 0 && <div className="text-gray-400 text-center">No items yet.</div>}
        <ul className="grid md:grid-cols-2 gap-6">
          {portfolio[activeTab].map(item => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="border border-cream rounded-lg p-4 flex flex-col gap-2 relative"
            >
              <div className="font-semibold mb-2">{item.title}</div>
              {item.type === 'image' && item.url && <img src={item.url} alt={item.title} className="rounded-lg object-cover h-40 w-full" />}
              {item.type === 'video' && item.url && <iframe src={item.url} title={item.title} className="rounded-lg w-full h-40" allowFullScreen></iframe>}
              {item.type === '3d' && item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">View 3D Tour</a>}
              {item.type === 'pdf' && item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-accent underline">View PDF</a>}
              {isAdmin && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(activeTab, item.id)}
                  className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                >
                  Delete
                </motion.button>
              )}
            </motion.li>
          ))}
        </ul>
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAdd(activeTab)}
              className="px-4 py-2 bg-gold text-primary rounded-full font-semibold shadow hover:bg-accent hover:text-white transition-colors"
            >
              Add {TABS.find(t => t.id === activeTab).label}
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
