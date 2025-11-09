# AI46 Website

A modern, professional website for AI46 - Your Partner in AI Transformation.

## Features

- ✨ Clean, modern design with gradient accents
- 📱 Fully responsive (mobile, tablet, desktop)
- ⚡ Fast loading with vanilla HTML/CSS/JavaScript
- 🎨 Professional color scheme with smooth animations
- 📬 Contact form with validation
- 🔍 SEO-friendly structure
- ♿ Accessibility features

## Quick Start

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository named `ai46-website`
2. Make it public (required for free GitHub Pages hosting)
3. Don't initialize with README

### 2. Upload Files

```bash
# Clone your repository
git clone https://github.com/YOUR-USERNAME/ai46-website.git
cd ai46-website

# Add the website files (index.html, styles.css, script.js)
# Copy the provided files into this directory

# Commit and push
git add .
git commit -m "Initial website commit"
git push origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Choose **main** branch and **/ (root)** folder
5. Click **Save**

Your site will be live at: `https://YOUR-USERNAME.github.io/ai46-website`

### 4. Custom Domain Setup (Later)

When ready to connect `ai46.app`:

1. In repository Settings → Pages → Custom domain
2. Enter `www.ai46.app`
3. In Squarespace DNS settings, add:
   - CNAME record: `www` → `YOUR-USERNAME.github.io`

## File Structure

```
ai46-website/
├── index.html     # Main HTML file
├── styles.css     # All styling
├── script.js      # Interactive features
└── README.md      # This file
```

## Customization Guide

### Colors

Edit the CSS variables in `styles.css`:

```css
:root {
  --primary-color: #4f46e5; /* Main brand color */
  --secondary-color: #06b6d4; /* Accent color */
  /* ... other colors */
}
```

### Content

- **Company Info**: Update email and contact details in `index.html`
- **Services**: Modify the services section to match your offerings
- **Stats**: Update the numbers in the About section

### Form Handling

The contact form currently logs to console. For production, integrate with:

- [Formspree](https://formspree.io) - Simple form backend
- [EmailJS](https://www.emailjs.com) - Send emails directly
- [Netlify Forms](https://www.netlify.com/products/forms/) - If you move to Netlify

Example Formspree integration:

```html
<form action="https://formspree.io/f/YOUR-FORM-ID" method="POST"></form>
```

### Images

Currently using emojis as placeholders. Add real images:

1. Create an `images` folder
2. Add optimized images (use WebP format for best performance)
3. Update `src` attributes in HTML

## Performance Tips

1. **Optimize Images**: Use WebP format, lazy loading
2. **Minify Code**: Use online tools to minify CSS/JS before production
3. **Enable Caching**: GitHub Pages handles this automatically
4. **Use CDN**: Consider using CDN for any libraries (though currently none are used)

## Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Future Enhancements

- [ ] Add actual images/graphics
- [ ] Implement real form backend
- [ ] Add blog section
- [ ] Add case studies
- [ ] Add team member profiles
- [ ] Implement dark mode toggle
- [ ] Add analytics (Google Analytics or Plausible)
- [ ] Add sitemap.xml for SEO
- [ ] Add testimonials carousel

## License

© 2025 AI46. All rights reserved.

## Support

For issues or questions, contact: contact@ai46.app
