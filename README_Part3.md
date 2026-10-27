# Hydravibe

Hydravibe is a small skincare brand website built with HTML, CSS and JavaScript for the WEDE5011 Web Development module (IIE).

**Student:** Samantha Rochelle George (ST10502195)
**Repository:** https://github.com/ST10502195/Hydravibe
**Live site:** <PASTE YOUR LIVE URL HERE>

---

## Part 3: Enhancing Functionality and SEO

Part 3 builds on the pure HTML/CSS site from Part 2 by adding JavaScript interactivity, search engine optimisation (SEO), working forms, and deployment.

### 1. JavaScript interactivity
- **Accordion:** expandable sections (for example FAQs) so users only see the content they open.
- **Modal:** pop-up dialog for extra information, opened and closed with JavaScript.
- **Lightbox:** clicking a gallery or product image opens an enlarged view.
- **Interactive map:** a Leaflet map showing the Hydravibe location.
- **Dynamic product listing:** products are rendered from a JavaScript data array, with:
  - **Search** by product name
  - **Filter** by category
  - **Sort** (for example by name or price)

### 2. SEO
- **Meta tags:** a unique `<title>` and meta description on every page, plus viewport and charset tags.
- **`robots.txt`:** tells search engine crawlers which parts of the site they may crawl and where the sitemap is.
- **`sitemap.xml`:** lists the site's pages to help search engines index them.
- Semantic HTML and descriptive `alt` text on images.

### 3. Forms and validation
- **`enquiry.html`** and **`contact.html`** use HTML forms with required fields and JavaScript validation (empty fields, valid email format) and clear error messages.
- **AJAX submission:** forms are submitted without a page reload, and a success or error message is shown to the user.
- **Contact form:** compiles the user's details into an email message.

### 4. Deployment
The site is deployed on a free hosting platform (GitHub Pages): <PASTE YOUR LIVE URL HERE>

---

## Project structure

```
Hydravibe/
├── index.html
├── enquiry.html
├── contact.html
├── (other pages)
├── css/
├── js/
├── images/
├── robots.txt
├── sitemap.xml
└── README.md
```

*Adjust this tree to match your actual folders and pages.*

---

## Changelog

### Part 3: Enhancing Functionality and SEO
- Added JavaScript back to the site: accordion, modal, lightbox and Leaflet map.
- Added dynamic product listing with search, filter and sort.
- Added SEO: meta tags, `robots.txt` and `sitemap.xml`.
- Added JavaScript validation and AJAX submission to `enquiry.html` and `contact.html`.
- Updated the README and changelog.
- Deployed the site to a free hosting platform.

### Part 2: CSS Styling and Responsive Design
- Styled the site in a hot pink and black colour scheme.
- Made the layout responsive with CSS media queries.
- Built as pure HTML/CSS (no JavaScript), as instructed by the lecturer.
- Deployed on GitHub Pages.

### Part 1: Building the Foundation
- Created the project proposal and initial HTML structure.
- Set up the GitHub repository with the initial folder structure and commits.
