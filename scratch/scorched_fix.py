import os

def scorched_earth_fix(file_path):
    with open(file_path, 'rb') as f:
        content = f.read()
    
    # Replace all known corrupted patterns
    # Em-dash (UTF-8: E2 80 94)
    content = content.replace(b'\xe2\x80\x94', b' &mdash; ')
    # En-dash (UTF-8: E2 80 93)
    content = content.replace(b'\xe2\x80\x93', b' &ndash; ')
    # Bullet (UTF-8: E2 80 A2)
    content = content.replace(b'\xe2\x80\xa2', b' &bull; ')
    # Corrupted â€” (C3 A2 E2 82 AC E2 80 9D)
    content = content.replace(b'\xc3\xa2\xe2\x82\xac\xe2\x80\x9d', b' &mdash; ')
    # Corrupted â€“ (C3 A2 E2 82 AC E2 80 93)
    content = content.replace(b'\xc3\xa2\xe2\x82\xac\xe2\x80\x93', b' &ndash; ')
    
    # Also handle literal â€” strings if they exist as characters
    # This covers the case where the file is already corrupted in its text form
    try:
        text = content.decode('utf-8')
        text = text.replace('—', ' &mdash; ')
        text = text.replace('–', ' &ndash; ')
        text = text.replace('•', ' &bull; ')
        text = text.replace('â€”', ' &mdash; ')
        text = text.replace('â€“', ' &ndash; ')
        content = text.encode('utf-8')
    except:
        pass

    with open(file_path, 'wb') as f:
        f.write(content)
    print(f"Applied scorched earth fix to {file_path}")

scorched_earth_fix(r'd:\Github\Avp\public\index.html')
