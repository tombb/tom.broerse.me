tom.broerse.me
==============

Personal website with blog, resume and pojects.

http://tom.broerse.me


Features / Credits
------------------

* Static site generation with [Jekyll](https://github.com/mojombo/jekyll)
* Responsive front-end using [ZURB Foundation](https://github.com/zurb/foundation)
* "Skim Friendly Resume" inspired by [Maxim Chernyak](https://github.com/maxim/maxim.github.com/)
* PDF resume generated using a custom Jekyll plugin that wraps around
  [wkhtmltopdf](https://github.com/antialize/wkhtmltopdf)


Install
-------

1. [Install Jekyll](https://github.com/mojombo/jekyll/wiki/install)

2. Clone this repo:
<pre>
git clone https://github.com/tombb/tom.broerse.me.git
</pre>

3. Install wkhtmto2pdf:
   * Download the static binary from http://code.google.com/p/wkhtmltopdf/downloads/list
   * Extract it to /bin/wkhtmltopdf
   
4. Generate the site:
<pre>
cd tom.broerse.me
jekyll --server
</pre>
After a few seconds the site should be up and running at http://localhost:4000.

Feel free to change any of this to your own needs.