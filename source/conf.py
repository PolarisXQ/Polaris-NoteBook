# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "Polaris' NoteBook"
copyright = '2023-2024, PolarisXQ'
author = 'PolarisXQ'
release = '0.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration


extensions = [
    'sphinx_markdown_tables',
    # 'sphinxemoji.sphinxemoji',
    'sphinx.ext.githubpages',
    'sphinx_copybutton',
    'sphinx.ext.mathjax',
    # 'pallets_sphinx_themes'
    'myst_parser'
]

myst_enable_extensions = [
    "amsmath",
    "attrs_inline",
    "colon_fence",
    "deflist",
    "dollarmath",
    "fieldlist",
    "html_admonition",
    "html_image",
    "linkify",
    "replacements",
    "smartquotes",
    "strikethrough",
    "substitution",
    "tasklist",    
    "ablog",
    "myst_nb",
    "numpydoc",
    "sphinx.ext.autodoc",
    "sphinx.ext.intersphinx",
    "sphinx.ext.viewcode",
    "sphinxcontrib.youtube",
    "sphinx_copybutton",
    "sphinx_design",
    "sphinx_examples",
    "sphinx_tabs.tabs",
    "sphinx_thebe",
    "sphinx_togglebutton",
    "sphinxcontrib.bibtex",
    "sphinxext.opengraph",
    # For the kitchen sink
    "sphinx.ext.todo",
]

templates_path = ['_templates']
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store"]

language = 'zh_CN'


myst_enable_extensions = [
    "dollarmath",
    "amsmath",
    "deflist",
    # "html_admonition",
    # "html_image",
    "colon_fence",
    # "smartquotes",
    # "replacements",
    # "linkify",
    # "substitution",
]

from recommonmark.parser import CommonMarkParser
source_parsers = {
'.md': CommonMarkParser,
}
source_suffix = ['.rst', '.md']

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

# html_theme = 'press'
html_theme = 'sphinx_book_theme'
html_logo = '_static/madcat_mini.png'
html_favicon='_static/madcat_mini.png'
html_title = "Polaris' NoteBook"
html_static_path = ['_static']
html_sidebars = {
    '***': ["search-field.html","sbt-sidebar-nav.html",],
}




html_theme_options = {
  "external_links": [
      ("Github", "https://github.com/PolarisXQ"),
    #   ("Other", "https://bla.com")
  ]
}