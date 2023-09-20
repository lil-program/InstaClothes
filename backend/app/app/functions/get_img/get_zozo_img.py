from selenium.webdriver import Chrome, ChromeOptions
import re

DEFAULT_IMAGE_PATH_PATTERN = r'"(http[^"]+)"'

def extract_image_url_from_html(html_content):
    for line in html_content.splitlines():
        if "DefaultImagePath" in line:
            url_match = re.search(DEFAULT_IMAGE_PATH_PATTERN, line)
            return url_match.group(1) if url_match else None
    return None

# def get_zozo_img(target_url):
target_url = "https://zozo.jp/shop/lacoste/goods-sale/51650460/?did=110829647&rid=1203"
def get_zozo_img(target_url ):
    options = ChromeOptions()
    
    with Chrome(options=options) as driver:
        driver.get(target_url)
        html_content = driver.page_source
        return extract_image_url_from_html(html_content) or False
