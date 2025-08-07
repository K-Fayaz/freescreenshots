require("dotenv").config();
require("./models/index");

const cors           = require("cors");
const express        = require("express");
const path           = require("path");
const https          = require("https");
const passport       = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app            = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://journaltotweet.com/auth/google/callback"
    : "http://localhost:8080/api/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
  try {

    console.log(profile);
    let userData = {
      email: profile.emails[0].value,
      name: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      profile: profile?.photos[0]?.value || null,
    }
    
    return done(null, userData);
  } catch (error) {
    return done(error, null);
  }
}));

// API routes
let userRoutes        = require("./routes/user");
let screenshotRoutes  = require("./routes/screenshot");
let googleOAuthRoutes = require("./routes/GoogleOAuth");
let toolsRoutes       = require("./routes/tools");

app.use('/api', screenshotRoutes);
app.use('/api/auth',googleOAuthRoutes);
app.use('/api/user',userRoutes);
app.use('/api/tools',toolsRoutes);

// Health check endpoint for Cloud Run
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Cloud Run compatible image proxy using native fetch
app.get('/api/image-proxy', async (req, res) => {
  const imageUrl = req.query.url;
  
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  console.log('Fetching image:', imageUrl); // Add logging for debugging

  try {
    // Add timeout and proper headers
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

    const response = await fetch(imageUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36',
        'Accept': 'image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      signal: controller.signal,
      // Important for Cloud Run
      redirect: 'follow',
      // Disable SSL verification if needed (not recommended for production)
      // agent: process.env.NODE_ENV === 'production' ? undefined : new https.Agent({ rejectUnauthorized: false })
    });

    clearTimeout(timeoutId);

    console.log('Response status:', response.status); // Debug logging

    if (!response.ok) {
      console.error('Failed to fetch image:', response.status, response.statusText);
      return res.status(response.status).json({ 
        error: `Failed to fetch image: ${response.status} ${response.statusText}`,
        url: imageUrl 
      });
    }

    // Get content type
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    console.log('Content-Type:', contentType); // Debug logging

    // More flexible content-type checking
    const isImage = contentType.startsWith('image/') || 
                   contentType.includes('octet-stream') ||
                   contentType === 'application/octet-stream' ||
                   !contentType.includes('text/') && !contentType.includes('application/json');

    if (!isImage) {
      console.log('Content-type indicates not an image, but proceeding anyway:', contentType);
      // Don't return error, just log and continue
    }

    // Set response headers
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    });

    // Convert response to buffer and send
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('Sending buffer of size:', buffer.length); // Debug logging
    res.send(buffer);

  } catch (error) {
    console.error('Image proxy error:', error);
    
    let errorMessage = 'Failed to fetch image';
    let statusCode = 500;
    
    if (error.name === 'AbortError') {
      errorMessage = 'Request timeout';
      statusCode = 504;
    } else if (error.code === 'ENOTFOUND') {
      errorMessage = 'Domain not found';
      statusCode = 404;
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connection refused';
      statusCode = 503;
    }
    
    res.status(statusCode).json({
      message: "Something went wrong!",
      error: errorMessage,
      url: imageUrl,
      details: error.message
    });
  }
});

// Add OPTIONS handler for CORS preflight
app.options('/api/image-proxy', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.status(200).end();
});

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to React for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server port
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
