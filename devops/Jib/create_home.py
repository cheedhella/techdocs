import os
from collections import defaultdict
import html

def create_index_page(root_dir, output_filename="home.html"):
    """
    Scans a directory for .html and .png files and creates an index HTML file
    with relative links to them, grouped by subdirectory.
    """
    print(f"Scanning for files in: {os.path.abspath(root_dir)}")
    
    # Use a dictionary to group files by their parent directory
    found_files = defaultdict(lambda: {'html': [], 'png': []})

    for dirpath, _, filenames in os.walk(root_dir):
        # We don't want to link to the index page itself or the script
        if output_filename in filenames:
            filenames.remove(output_filename)
        if os.path.basename(__file__) in filenames:
            filenames.remove(os.path.basename(__file__))

        for filename in filenames:
            relative_dir = os.path.relpath(dirpath, root_dir)
            if relative_dir == ".":
                relative_dir = "Root" # Group files in the root directory

            if filename.endswith(".html"):
                found_files[relative_dir]['html'].append(filename)
            elif filename.endswith(".png"):
                found_files[relative_dir]['png'].append(filename)

    if not found_files:
        print("No .html or .png files found to index.")
        return

    # Start building the HTML content
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentation Home</title>
    <link rel="stylesheet" href="resources/css/styles.css" />
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            margin: 2em auto;
            max-width: 800px;
            padding: 0 1em;
        }}
        h1 {{
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #333;
            font-size: 1.2em;
            margin-top: 1.5em;
            border-bottom: 1px solid #eee;
        }}
        ul {{
            list-style-type: none;
            padding-left: 0;
        }}
        li {{
            margin-bottom: 0.5em;
        }}
        a {{
            text-decoration: none;
            color: #0066cc;
            font-weight: 500;
        }}
        a:hover {{
            text-decoration: underline;
        }}
        .file-icon {{
            display: inline-block;
            width: 20px;
            text-align: center;
            margin-right: 8px;
        }}
    </style>
</head>
<body>
    <h1>Table of Contents</h1>
"""

    # Sort directories for consistent order
    for directory in sorted(found_files.keys()):
        files = found_files[directory]
        
        # Create a nice-looking heading for the directory
        dir_display_name = directory.replace(os.path.sep, ' &raquo; ')
        html_content += f"    <h2>{dir_display_name}</h2>\n    <ul>\n"

        # Add links for HTML files
        for filename in sorted(files['html']):
            link_path = os.path.join(directory, filename) if directory != "Root" else filename
            page_title = html.escape(os.path.splitext(filename)[0])
            html_content += f'        <li><span class="file-icon">&#128196;</span><a href="{link_path}">{page_title}</a></li>\n'

        # Add links for PNG files
        for filename in sorted(files['png']):
            link_path = os.path.join(directory, filename) if directory != "Root" else filename
            page_title = html.escape(os.path.splitext(filename)[0])
            html_content += f'        <li><span class="file-icon">&#128444;</span><a href="{link_path}">{page_title}</a></li>\n'
            
        html_content += "    </ul>\n"

    html_content += """
</body>
</html>
"""

    output_filepath = os.path.join(root_dir, output_filename)
    try:
        with open(output_filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"\\nSuccessfully created index file at: {os.path.abspath(output_filepath)}")
    except Exception as e:
        print(f"Error writing to file: {e}")


if __name__ == "__main__":
    # The root directory to scan. The script is expected to be in this directory.
    target_directory = os.path.dirname(os.path.abspath(__file__))
    create_index_page(target_directory, "home.html")


