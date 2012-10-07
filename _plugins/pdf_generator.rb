module Jekyll
  
  #
  # Initialize a new PDF file (generated from HTML)
  #
  # site     - The Site.
  # base     - The String path to the <source>.
  # dir      - The String path between <source> and the file.
  # name     - The String filename of the file.
  # htmlfile - The html file to render as pdf.
  #
  class PdfFromHTML < StaticFile
    def initialize(site, base, dir, name, htmlfile)
       super(site, base, dir, name)
       @htmlfile = htmlfile
    end
    
    def write(dest)
      dest_path = destination(dest)
      FileUtils.mkdir_p(File.dirname(dest_path))
      system(
        @site.config['pdftool'] + ' file://' + @htmlfile +' ' + dest_path
      );
    end
  end
  
  #
  # Generate a PDF file for pages that have a pdf_version variable
  # in their YAML config. The pdf is generated from the HTML version
  # of the page, using the pdf tool specified in the site's config.
  #
  class PdfGenerator < Generator
    safe true
    
    def generate(site)
      if (site.config['pdftool'])
        site.pages.each do |page|
          if (page.data['pdf_version'])
            name = File.basename(page.data['pdf_version'])
            dir = page.data['pdf_version'].sub(name, '');
            site.static_files << Jekyll::PdfFromHTML.new(
              site, site.dest, dir, name, page.destination(site.dest)
            )
          end
        end
      end
    end
  end
end