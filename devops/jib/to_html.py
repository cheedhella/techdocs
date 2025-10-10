import os
import html

def convert_txt_to_html(directory="."):
    """
    Converts all .txt files in a directory to .html files.

    Args:
        directory (str): The path to the directory containing .txt files.
    """
    print(f"Searching for .txt files in: {os.path.abspath(directory)}")
    
    try:
        files = os.listdir(directory)
    except FileNotFoundError:
        print(f"Error: Directory not found at '{directory}'")
        return

    txt_files_found = 0
    for filename in files:
        if filename.endswith(".txt"):
            txt_files_found += 1
            txt_filepath = os.path.join(directory, filename)
            html_filename = os.path.splitext(filename)[0] + ".html"
            html_filepath = os.path.join(directory, html_filename)

            print(f"Converting '{txt_filepath}' to '{html_filepath}'...")

            try:
                with open(txt_filepath, 'r', encoding='utf-8') as f_in:
                    content = f_in.read()

                # Escape HTML special characters to display them correctly
                escaped_content = html.escape(content)

                html_content = f"""<!DOCTYPE html>
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Array</title>
    <link rel="stylesheet" href="../../../resources/css/styles.css" />
    <link rel="stylesheet" href="../../../resources/css/codeblock.css" />
</head>

<body>
    <div class="question"><strong>1. Hello</strong></div>
    <div class="answer">
    <pre>{escaped_content}</pre>
    </div>
    <script src="../../../resources/js/codeblock.js"></script>
</body>
</html>
"""

                with open(html_filepath, 'w', encoding='utf-8') as f_out:
                    f_out.write(html_content)
            
            except Exception as e:
                print(f"  Could not process file {filename}. Error: {e}")

    if txt_files_found == 0:
        print("No .txt files found to convert.")
    else:
        print(f"\nConversion complete. Processed {txt_files_found} file(s).")


if __name__ == "__main__":
    # Run the conversion in the current directory
    convert_txt_to_html()

