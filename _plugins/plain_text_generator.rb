module Jekyll
  
  #
  # Initialize a new plain text file (using given content)
  #
  # site     - The Site.
  # base     - The String path to the <source>.
  # dir      - The String path between <source> and the file.
  # name     - The String filename of the file.
  # htmlfile - The html file to render as pdf.
  #
  class PlainTextFile < StaticFile
    def initialize(site, base, dir, name, content)
       super(site, base, dir, name)
       @content = content
    end
    
    def write(dest)
      dest_path = destination(dest)
      FileUtils.mkdir_p(File.dirname(dest_path))
      File.open(dest_path, 'w') { |f|
        f.write(@content)
      }
    end
  end
  
  #
  # Generate a plain text file for pages that have a plain_text_version 
  # variable in their YAML config. The new file is just a straight
  # copy of the original, but without the YAML data at the top.
  #
  class PlainTextGenerator < Generator
    safe true
    
    def generate(site)
      site.pages.each do |page|
        if (page.data['plain_text_version'])
          name = File.basename(page.data['plain_text_version'])
          dir = page.data['plain_text_version'].sub(name, '');
          site.static_files << Jekyll::PlainTextFile.new(
            site, site.dest, dir, name, page.to_s
          )
        end
      end
    end
  end
  
end