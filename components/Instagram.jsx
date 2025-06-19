import React, { useState, useEffect, useRef } from 'react';

// Instagram API service
class InstagramAPI {
    constructor() {
        this.baseUrl = 'https://graph.instagram.com';
        this.clientId = process.env.REACT_APP_INSTAGRAM_APP_ID;
        this.clientSecret = process.env.REACT_APP_INSTAGRAM_APP_SECRET;
        this.redirectUri = process.env.REACT_APP_REDIRECT_URI;
    }

    // Step 1: Get authorization URL
    getAuthUrl() {
        const scopes = 'user_profile,user_media';
        return `https://api.instagram.com/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scopes}&response_type=code`;
    }

    // Step 2: Exchange code for access token (this should be done on your backend)
    async getAccessToken(code) {
        const response = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: 'authorization_code',
                redirect_uri: this.redirectUri,
                code: code,
            }),
        });
        return response.json();
    }

    // Step 3: Get user media with engagement data
    async getUserMedia(accessToken, limit = 8) {
        const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count';
        const url = `${this.baseUrl}/me/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data.data;
    }

    // Get user profile
    async getUserProfile(accessToken) {
        const fields = 'id,username,account_type,media_count';
        const url = `${this.baseUrl}/me?fields=${fields}&access_token=${accessToken}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        return data;
    }
}

// Individual Instagram Post Component
const InstagramPost = ({ post, index }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const postRef = useRef(null);
    const videoRef = useRef(null);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, index * 100); // Stagger animation
                }
            },
            { threshold: 0.1 }
        );

        if (postRef.current) {
            observer.observe(postRef.current);
        }

        return () => observer.disconnect();
    }, [index]);

    // Auto-play video on hover
    useEffect(() => {
        if (videoRef.current) {
            if (isHovered) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isHovered]);

    const formatDate = (timestamp) => {
        const now = new Date();
        const postDate = new Date(timestamp);
        const diffTime = Math.abs(now - postDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diffTime / (1000 * 60));

        if (diffDays > 0) return `${diffDays}d ago`;
        if (diffHours > 0) return `${diffHours}h ago`;
        if (diffMinutes > 0) return `${diffMinutes}m ago`;
        return 'Just now';
    };

    const formatCount = (count) => {
        if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
        if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
        return count?.toString() || '0';
    };

    return (
        <div
            ref={postRef}
            className={`instagram-post ${isVisible ? 'animate-in' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="post-media">
                {!imageLoaded && (
                    <div className="loading-placeholder">
                        <div className="spinner"></div>
                    </div>
                )}

                {post.media_type === 'VIDEO' ? (
                    <video
                        ref={videoRef}
                        src={post.media_url}
                        poster={post.thumbnail_url}
                        muted
                        loop
                        playsInline
                        onLoadedData={() => setImageLoaded(true)}
                        style={{ display: imageLoaded ? 'block' : 'none' }}
                    />
                ) : (
                    <img
                        src={post.media_url}
                        alt={post.caption || 'Instagram post'}
                        onLoad={() => setImageLoaded(true)}
                        style={{ display: imageLoaded ? 'block' : 'none' }}
                    />
                )}

                {/* Hover Overlay */}
                <div className={`post-overlay ${isHovered ? 'visible' : ''}`}>
                    <div className="overlay-content">
                        <div className="engagement-stats">
                            <div className="stat">
                                <span className="icon">❤️</span>
                                <span className="count">{formatCount(post.like_count)}</span>
                            </div>
                            <div className="stat">
                                <span className="icon">💬</span>
                                <span className="count">{formatCount(post.comments_count)}</span>
                            </div>
                        </div>
                        <div className="post-meta">
                            <span className="username">@username</span>
                            <span className="time">{formatDate(post.timestamp)}</span>
                        </div>
                    </div>
                </div>

                {post.media_type === 'VIDEO' && (
                    <div className="media-indicator">
                        <span className="play-icon">▶</span>
                    </div>
                )}
            </div>
        </div>
    );
};

// Main Instagram Feed Component
const InstagramFeed = () => {
    const [posts, setPosts] = useState([]);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [instagramAPI] = useState(new InstagramAPI());

    // Check for access token in localStorage on component mount
    useEffect(() => {
        const savedToken = localStorage.getItem('instagram_access_token');
        if (savedToken) {
            setAccessToken(savedToken);
        }
    }, []);

    // Fetch posts when access token is available
    useEffect(() => {
        if (accessToken) {
            fetchInstagramData();
        }
    }, [accessToken]);

    const fetchInstagramData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Fetch user profile and media in parallel
            const [profileData, postsData] = await Promise.all([
                instagramAPI.getUserProfile(accessToken),
                instagramAPI.getUserMedia(accessToken, 8) // Get 8 posts for 2x4 grid
            ]);

            setProfile(profileData);
            setPosts(postsData);
        } catch (err) {
            setError(`Failed to fetch Instagram data: ${err.message}`);
            // If token is invalid, remove it
            if (err.message.includes('Invalid') || err.message.includes('expired')) {
                localStorage.removeItem('instagram_access_token');
                setAccessToken(null);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        const authUrl = instagramAPI.getAuthUrl();
        window.location.href = authUrl;
    };

    const handleLogout = () => {
        localStorage.removeItem('instagram_access_token');
        setAccessToken(null);
        setPosts([]);
        setProfile(null);
    };

    // Handle OAuth callback (you'd typically do this on a separate route)
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code && !accessToken) {
            // In a real app, you'd send this code to your backend
            // For demo purposes, we'll show how to handle it
            console.log('Authorization code received:', code);
            // You would call: instagramAPI.getAccessToken(code)
            // Then save the returned access_token
        }
    }, []);

    if (!accessToken) {
        return (
            <div className="instagram-auth">
                <h2>Connect Your Instagram Account</h2>
                <p>Authorize this app to display your latest Instagram posts</p>
                <button onClick={handleLogin} className="auth-button">
                    Connect Instagram Account
                </button>
                <div className="auth-info">
                    <p><strong>Note:</strong> This requires setting up Instagram Basic Display API</p>
                    <p>You'll need to:</p>
                    <ul>
                        <li>Create a Facebook Developer account</li>
                        <li>Set up an Instagram Basic Display app</li>
                        <li>Configure OAuth redirect URIs</li>
                        <li>Add your app credentials to environment variables</li>
                    </ul>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="instagram-loading">
                <div className="spinner"></div>
                <p>Loading Instagram posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="instagram-error">
                <h3>Error Loading Instagram Feed</h3>
                <p>{error}</p>
                <button onClick={fetchInstagramData} className="retry-button">
                    Try Again
                </button>
                <button onClick={handleLogout} className="logout-button">
                    Disconnect Account
                </button>
            </div>
        );
    }

    return (
        <div className="instagram-feed">
            {profile && (
                <div className="instagram-header">
                    <div className="header-content">
                        <h2>Latest from Instagram</h2>
                        <div className="profile-info">
                            <span className="username">@{profile.username}</span>
                            <span className="dot">•</span>
                            <span className="post-count">{profile.media_count} posts</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="disconnect-btn">
                        <span>Disconnect</span>
                    </button>
                </div>
            )}

            <div className="instagram-grid">
                {posts.slice(0, 8).map((post, index) => (
                    <InstagramPost key={post.id} post={post} index={index} />
                ))}
            </div>

            {posts.length === 0 && (
                <div className="no-posts">
                    <div className="empty-state">
                        <div className="empty-icon">📸</div>
                        <p>No posts found</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstagramFeed;