const path = require("path");
const pkg = require("./package.json");
const webpackConfig = require("./styleguide.webpack.config.js");

module.exports = {
  title: `${pkg.name} v${pkg.version}`,
  components: "src/components/**/*.jsx",
  showSidebar: true,
  usageMode: "expand",
  skipComponentsWithoutExample: true,
  theme: {
    color: {
      link: "#065fd4",
      linkHover: "#00adef",
    },
    font: ["Helvetica", "sans-serif"],
  },
  styles: {
    Heading: {
      heading2: {
        fontSize: 26,
      },
    },
    ReactComponent: {
      root: {
        marginBottom: 20,
      },
      header: {
        marginBottom: 0,
      },
      tabs: {
        marginBottom: 0,
      },
    },
  },
  webpackConfig,
  template: {
    head: {
      links: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/katex@0.16.7/dist/katex.min.css",
        },
      ],
    },
  },
};
