# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "Polaris' NoteBook"
copyright = '2023, PolarisXQ'
author = 'PolarisXQ'
release = '0.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration


extensions = [
    'recommonmark',
    # 'sphinx_markdown_tables',
    # 'sphinxemoji.sphinxemoji',
    'sphinx.ext.githubpages',
    'sphinx_copybutton',
    # 'pallets_sphinx_themes'
]

templates_path = ['_templates']
exclude_patterns = []

language = 'zh_CN'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'press'
html_static_path = ['_static']


from recommonmark.parser import CommonMarkParser
source_parsers = {
'.md': CommonMarkParser,
}
source_suffix = ['.rst', '.md']


html_logo = '_static/madcat_mini.png'

html_favicon='_static/madcat_mini.png'


html_theme_options = {
  "external_links": [
      ("Github", "https://github.com/PolarisXQ"),
    #   ("Other", "https://bla.com")
  ]
}