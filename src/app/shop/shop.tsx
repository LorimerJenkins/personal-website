"use client";
import styles from "./shop.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useTranslation } from "@/hooks/useTranslation";
import {
  getLocaleFromStorage,
  type SupportedLocale,
} from "@/utils/translations";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { products, formatPrice, type Product } from "./shopData";

interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

function ProductCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length <= 1) {
    return (
      <Image
        src={images[0]}
        alt={alt}
        fill
        className={styles.productImage}
        sizes="(max-width: 580px) 100%, (max-width: 900px) 50%, 33%"
      />
    );
  }

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <>
      <Image
        src={images[activeIndex]}
        alt={`${alt} - ${activeIndex + 1}`}
        fill
        className={styles.productImage}
        sizes="(max-width: 580px) 100%, (max-width: 900px) 50%, 33%"
      />
      <button
        className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
        onClick={prev}
        aria-label="Previous image"
      >
        ‹
      </button>
      <button
        className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
        onClick={next}
        aria-label="Next image"
      >
        ›
      </button>
      <div className={styles.carouselDots}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselDot} ${index === activeIndex ? styles.carouselDotActive : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}

function Shop() {
  const { tSection, isLoading } = useTranslation();
  const t = tSection("ShopPage");
  const [locale, setLocale] = useState<SupportedLocale>("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  useEffect(() => {
    setLocale(getLocaleFromStorage());

    const handleLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: SupportedLocale }>;
      setLocale(customEvent.detail.locale);
    };

    window.addEventListener("localeChange", handleLocaleChange);
    return () => window.removeEventListener("localeChange", handleLocaleChange);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("shop-cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        const rehydrated = parsed
          .map(
            (item: {
              productId: string;
              quantity: number;
              variantId?: string;
            }) => {
              const product = products.find((p) => p.id === item.productId);
              if (!product) return null;
              return {
                product,
                quantity: item.quantity,
                variantId: item.variantId,
              };
            },
          )
          .filter(Boolean) as CartItem[];
        setCart(rehydrated);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const serialized = cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      variantId: item.variantId,
    }));
    localStorage.setItem("shop-cart", JSON.stringify(serialized));
  }, [cart]);

  const addToCart = useCallback((product: Product, variantId?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id && item.variantId === variantId,
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.variantId === variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1, variantId }];
    });
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback(
    (productId: string, variantId?: string) => {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(item.product.id === productId && item.variantId === variantId),
        ),
      );
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string | undefined, delta: number) => {
      setCart(
        (prev) =>
          prev
            .map((item) => {
              if (
                item.product.id === productId &&
                item.variantId === variantId
              ) {
                const newQty = item.quantity + delta;
                return newQty <= 0 ? null : { ...item, quantity: newQty };
              }
              return item;
            })
            .filter(Boolean) as CartItem[],
      );
    },
    [],
  );

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            priceId: item.product.stripePriceId,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const titleText = isLoading ? "Shop" : t("title");
  const subtitleText = isLoading ? "Grab some merch" : t("subtitle");
  const addToCartText = isLoading ? "Add to Cart" : t("addToCart");
  const addedText = isLoading ? "Added!" : t("added");
  const soldOutText = isLoading ? "Sold Out" : t("soldOut");
  const cartText = isLoading ? "Cart" : t("cart");
  const checkoutText = isLoading ? "Checkout" : t("checkout");
  const emptyCartText = isLoading ? "Your cart is empty" : t("emptyCart");
  const removeText = isLoading ? "Remove" : t("remove");
  const loadingText = isLoading ? "Loading..." : t("loading");

  if (isLoading) {
    return (
      <div className={styles.page}>
        <Header />
        <div className={styles.body}>
          <p style={{ margin: 0 }}>{loadingText}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.title}>{titleText}</h1>
              <p className={styles.subtitle}>{subtitleText}</p>
            </div>
            <button
              className={styles.cartButton}
              onClick={() => setCartOpen(!cartOpen)}
            >
              <span className={styles.cartIcon}>🛒</span>
              {cartText}
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Cart Drawer */}
        {cartOpen && (
          <div className={styles.cartDrawer}>
            <div className={styles.cartHeader}>
              <h3 className={styles.cartTitle}>{cartText}</h3>
              <button
                className={styles.cartClose}
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className={styles.emptyCart}>{emptyCartText}</p>
            ) : (
              <>
                <div className={styles.cartItems}>
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.variantId}`}
                      className={styles.cartItem}
                    >
                      <div className={styles.cartItemImageWrapper}>
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className={styles.cartItemImage}
                          sizes="48px"
                        />
                      </div>
                      <div className={styles.cartItemInfo}>
                        <span className={styles.cartItemName}>
                          {item.product.title}
                        </span>
                        <span className={styles.cartItemPrice}>
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                      <div className={styles.cartItemActions}>
                        <div className={styles.quantityControl}>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.variantId,
                                -1,
                              )
                            }
                          >
                            −
                          </button>
                          <span className={styles.quantityValue}>
                            {item.quantity}
                          </span>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              updateQuantity(item.product.id, item.variantId, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className={styles.removeButton}
                          onClick={() =>
                            removeFromCart(item.product.id, item.variantId)
                          }
                        >
                          {removeText}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.cartFooter}>
                  <div className={styles.cartTotal}>
                    <span>Total</span>
                    <span className={styles.cartTotalPrice}>
                      {formatPrice(cartTotal)}
                    </span>
                  </div>
                  <button
                    className={styles.checkoutButton}
                    onClick={handleCheckout}
                    disabled={checkoutLoading}
                  >
                    {checkoutLoading ? "..." : checkoutText}
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Products Grid */}
        <div className={styles.productGrid}>
          {products.map((product) => {
            const isAdded = addedProductId === product.id;

            return (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImageWrapper}>
                  <ProductCarousel
                    images={product.images}
                    alt={product.title}
                  />
                  {product.badge && (
                    <span className={styles.productBadge}>{product.badge}</span>
                  )}
                  <div className={styles.productOverlay}>
                    <div className={styles.productOverlayContent}>
                      <h2 className={styles.productTitle}>{product.title}</h2>
                      <p className={styles.productDescription}>
                        {t(product.descriptionKey)}
                      </p>
                    </div>
                    <div className={styles.productFooter}>
                      <span className={styles.productPrice}>
                        {formatPrice(product.price)}
                      </span>
                      {product.soldOut ? (
                        <button className={styles.soldOutButton} disabled>
                          {soldOutText}
                        </button>
                      ) : (
                        <button
                          className={`${styles.addToCartButton} ${isAdded ? styles.addedButton : ""}`}
                          onClick={() =>
                            addToCart(product, product.variants?.options[0]?.id)
                          }
                        >
                          {isAdded ? addedText : addToCartText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Shop;
