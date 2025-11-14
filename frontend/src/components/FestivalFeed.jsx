import React, { useState, useEffect, useRef } from 'react';

function FestivalFeed({ currentStage }) {
  const [posts, setPosts] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [filter, setFilter] = useState('all');
  const [hoveredPost, setHoveredPost] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, [filter, currentStage]);

  const fetchPosts = async () => {
    try {
      let url = 'http://localhost:5000/api/feed/posts';
      if (filter === 'stage-specific' && currentStage) {
        url += `?stage=${currentStage}`;
      } else if (filter === 'trending') {
        url += '?sort=trending';
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setPosts(data);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Please select an image or video file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('media', selectedFile);
      formData.append('caption', caption);
      formData.append('stage', currentStage || 'Main Stage');
      
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          formData.append('lat', position.coords.latitude);
          formData.append('lng', position.coords.longitude);
        } catch (e) {}
      }

      const response = await fetch('http://localhost:5000/api/feed/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('✅ Posted!');
        setSelectedFile(null);
        setPreviewUrl(null);
        setCaption('');
        fetchPosts();
      }
    } catch (error) {
      alert('❌ Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReact = async (postId, emoji) => {
    try {
      await fetch(`http://localhost:5000/api/feed/react/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji })
      });
      fetchPosts();
    } catch (error) {}
  };

  const getPopularityScore = (post) => {
    if (!post || !post.reactions) return 0;
    return (post.reactions.fire || 0) * 3 + 
           (post.reactions.heart || 0) * 2 + 
           (post.reactions.wow || 0) * 1.5;
  };

  const sortedPosts = Array.isArray(posts) ? [...posts].sort((a, b) => {
    if (filter === 'trending') {
      return getPopularityScore(b) - getPopularityScore(a);
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
  }) : [];

  return (
    <div style={{ marginBottom: '50px' }}>
      {/* Modern Header - Saturnalia Gradient */}
      <div style={{
        background: 'linear-gradient(135deg, #ff7800 0%, #FFD700 100%)',
        padding: '40px 30px',
        borderRadius: '0 0 30px 30px',
        textAlign: 'center',
        boxShadow: '0 4px 20px rgba(255, 120, 0, 0.3)'
      }}>
        <h2 style={{
          color: '#fff',
          fontSize: '42px',
          fontWeight: '900',
          margin: '0 0 10px 0',
          letterSpacing: '1px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          📸 Festival Moments
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.95)',
          fontSize: '16px',
          margin: 0
        }}>
          Share and discover the best moments from Saturnalia 2025
        </p>
      </div>

      {/* Upload Card */}
      <div style={{
        background: '#fff',
        padding: '25px',
        boxShadow: '0 2px 12px rgba(255, 120, 0, 0.15)',
        marginBottom: '20px',
        borderRadius: '16px',
        border: '2px solid rgba(255, 120, 0, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff7800 0%, #FFD700 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            border: '3px solid #fff',
            boxShadow: '0 2px 8px rgba(255, 120, 0, 0.3)'
          }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,video/*"
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                width: '100%',
                padding: '12px 20px',
                background: '#fff5e6',
                border: '2px solid #ffcc80',
                borderRadius: '25px',
                textAlign: 'left',
                color: '#d84315',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = '#ffe0b2';
                e.target.style.borderColor = '#ff7800';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#fff5e6';
                e.target.style.borderColor = '#ffcc80';
              }}
            >
              {selectedFile ? '📷 Photo selected! Add caption...' : "What's happening at the festival?"}
            </button>
          </div>
        </div>

        {previewUrl && (
          <div style={{ marginBottom: '15px', position: 'relative' }}>
            {selectedFile?.type.startsWith('image/') ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                style={{ 
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  border: '3px solid #ff7800'
                }} 
              />
            ) : (
              <video 
                src={previewUrl} 
                controls 
                style={{ 
                  width: '100%',
                  maxHeight: '400px',
                  borderRadius: '12px',
                  border: '3px solid #ff7800'
                }} 
              />
            )}
            <button
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'rgba(255, 120, 0, 0.9)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          </div>
        )}

        {selectedFile && (
          <>
            <input
              type="text"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #ffcc80',
                borderRadius: '8px',
                fontSize: '15px',
                marginBottom: '15px',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#ff7800'}
              onBlur={(e) => e.target.style.borderColor = '#ffcc80'}
            />
            
            <button
              onClick={handleUpload}
              disabled={isUploading}
              style={{
                width: '100%',
                padding: '12px',
                background: isUploading ? '#ccc' : 'linear-gradient(135deg, #ff7800 0%, #FFD700 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: isUploading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(255, 120, 0, 0.3)'
              }}
            >
              {isUploading ? '⏳ Posting...' : '✨ Share Post'}
            </button>
          </>
        )}
      </div>

      {/* Filter Pills */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '25px',
        overflowX: 'auto',
        padding: '5px 0'
      }}>
        {[
          { key: 'all', label: 'All', icon: '🌍' },
          { key: 'trending', label: 'Trending', icon: '🔥' },
          { key: 'stage-specific', label: 'Nearby', icon: '📍' }
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            style={{
              padding: '10px 20px',
              background: filter === f.key ? 'linear-gradient(135deg, #ff7800 0%, #FFD700 100%)' : '#fff',
              color: filter === f.key ? '#fff' : '#d84315',
              border: filter === f.key ? 'none' : '2px solid #ffcc80',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              boxShadow: filter === f.key ? '0 4px 12px rgba(255, 120, 0, 0.3)' : 'none'
            }}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {sortedPosts.map(post => (
          <div
            key={post._id || post.id}
            style={{
              background: '#fff',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid',
              borderColor: getPopularityScore(post) > 10 ? '#ff7800' : 'rgba(255, 120, 0, 0.2)',
              boxShadow: hoveredPost === post._id 
                ? '0 12px 24px rgba(255, 120, 0, 0.3)' 
                : '0 2px 12px rgba(255, 120, 0, 0.1)',
              transition: 'all 0.3s ease',
              transform: hoveredPost === post._id ? 'translateY(-4px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setHoveredPost(post._id)}
            onMouseLeave={() => setHoveredPost(null)}
          >
            {/* Post Header */}
            <div style={{
              padding: '14px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 120, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff7800 0%, #FFD700 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px'
                }}>
                  👤
                </div>
                <div>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#2a1810',
                    marginBottom: '2px'
                  }}>
                    Festival Goer
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#d84315',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    📍 {post.stage}
                  </div>
                </div>
              </div>
              {getPopularityScore(post) > 10 && (
                <div style={{
                  padding: '4px 10px',
                  background: 'linear-gradient(135deg, #ff7800 0%, #FFD700 100%)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 8px rgba(255, 120, 0, 0.3)'
                }}>
                  🔥 HOT
                </div>
              )}
            </div>

            {/* Media */}
            {post.mediaType === 'image' ? (
              <img
                src={post.mediaUrl}
                alt={post.caption || 'Festival moment'}
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover'
                }}
              />
            )}

            {/* Actions */}
            <div style={{ padding: '12px 16px' }}>
              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '12px'
              }}>
                {[
                  { emoji: '🔥', key: 'fire' },
                  { emoji: '❤️', key: 'heart' },
                  { emoji: '😍', key: 'wow' }
                ].map(react => (
                  <button
                    key={react.key}
                    onClick={() => handleReact(post._id || post.id, react.emoji)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '24px',
                      padding: '5px',
                      transition: 'transform 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    {react.emoji}
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#2a1810' }}>
                      {post.reactions?.[react.key] || 0}
                    </span>
                  </button>
                ))}
              </div>

              {post.caption && (
                <div style={{
                  fontSize: '14px',
                  color: '#2a1810',
                  lineHeight: '1.5',
                  marginBottom: '8px'
                }}>
                  {post.caption}
                </div>
              )}

              <div style={{
                fontSize: '12px',
                color: '#d84315',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedPosts.length === 0 && (
        <div style={{
          background: '#fff',
          padding: '80px 40px',
          borderRadius: '16px',
          textAlign: 'center',
          boxShadow: '0 2px 12px rgba(255, 120, 0, 0.15)',
          border: '2px solid rgba(255, 120, 0, 0.2)'
        }}>
          <div style={{ fontSize: '72px', marginBottom: '20px', opacity: 0.5 }}>📸</div>
          <h3 style={{ color: '#2a1810', fontSize: '20px', marginBottom: '10px' }}>
            No posts yet
          </h3>
          <p style={{ color: '#d84315', fontSize: '15px' }}>
            Be the first to share a moment from the festival!
          </p>
        </div>
      )}
    </div>
  );
}

export default FestivalFeed;
