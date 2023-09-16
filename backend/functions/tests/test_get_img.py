import sys
sys.path.append("..")

from main import main


def test_get_img():
    test_urls = [
        "https://shop-list.com/women/niceclaup/0822060840/",
        "https://shop-list.com/women/niceclaup/0832060330/",
        "https://zozo.jp/shop/adidas/goods/73131257/?did=120132956&rid=1006",
        "https://zozo.jp/shop/adidas/goods/73131266/?did=120080522&rid=1006",
        "hogehoge"
    ]

    for test_url in test_urls:
        print("---------------------------------------------------------------------------------")
        print(test_url)
        print(main(test_url))

if __name__ == '__main__':
    test_get_img()