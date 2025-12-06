// Custom Element: <project-card>
// Part 1 of HW5 - CustomElement Creation

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['title', 'image', 'alt', 'description', 'link', 'date', 'keywords'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || 'Untitled Project';
    const image = this.getAttribute('image') || '';
    const alt = this.getAttribute('alt') || 'Project image';
    const description = this.getAttribute('description') || 'No description available';
    const link = this.getAttribute('link') || '#';
    const date = this.getAttribute('date') || '';
    const keywords = this.getAttribute('keywords') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%; /* Ensure full width of grid cell */
          box-sizing: border-box; /* Include padding in width calculation */
          --card-bg: var(--color-bg, #ffffff);
          --card-border: var(--color-border, #e5e7eb);
          --card-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.1));
          --card-hover-shadow: var(--shadow-md, 0 6px 12px rgba(0, 0, 0, 0.15));
          --card-padding: var(--spacing-md, 1.5rem);
          --card-border-radius: var(--border-radius, 0.5rem);
          --card-gap: var(--spacing-sm, 1rem);
          --title-color: var(--color-primary, #004080);
          --text-color: var(--color-text, #1f2937);
          --text-light: var(--color-text-light, #6b7280);
          --link-color: var(--color-primary, #004080);
        }

        .card {
          display: flex;
          flex-direction: column;
          background-color: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: var(--card-border-radius);
          padding: var(--card-padding);
          box-shadow: var(--card-shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
          width: 100%; /* Ensure card fills its container */
          box-sizing: border-box; /* Include border and padding in width */
          margin: 0; /* Remove any default margins */
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: var(--card-hover-shadow);
        }

        picture {
          width: 100%;
          margin-bottom: var(--card-gap);
          border-radius: calc(var(--card-border-radius) * 0.8);
          overflow: hidden;
        }

        picture img {
          width: 100%;
          height: 250px;       /* 固定高度，确保卡片整齐 */
          display: block;
          object-fit: cover;   /* 防止图片变形，保持比例 */
        }

        h2 {
          margin: 0 0 var(--card-gap) 0;
          color: var(--title-color);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
        }

        .description {
          color: var(--text-color);
          line-height: 1.6;
          margin-bottom: var(--card-gap);
          flex-grow: 1;
        }

        .link {
          display: inline-block;
          color: var(--link-color);
          text-decoration: none;
          font-weight: 500;
          margin-top: auto;
          transition: color 0.2s ease;
        }

        .link:hover {
          text-decoration: underline;
        }

        .link::after {
          content: ' →';
          margin-left: 0.25rem;
        }
      </style>

      <div class="card">
        ${image ? `
          <picture>
            <source srcset="${image}" type="image/jpeg" media="(min-width: 800px)">
            <source srcset="${image}" type="image/jpeg" media="(min-width: 400px)">
            <img src="${image}" alt="${alt}" loading="lazy">
          </picture>
        ` : ''}
        
        <h2>${this.escapeHtml(title)}</h2>
        
        <p class="description">${this.escapeHtml(description)}</p>
        
        <a href="${link}" class="link">Learn More</a>
      </div>
    `;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Register the custom element
customElements.define('project-card', ProjectCard);

