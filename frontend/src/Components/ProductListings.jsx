import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import SearchBox from "./SearchBox";
import Dropdown from "./Dropdown";
import "./ProductListings.css";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

export default function ProductListings({ products = [] }) {
  const [searchText, setSearchText] = useState("");
  const [selectedSort, setSelectedSort] = useState("Popularity");

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = products.filter((product) => {
      const search = searchText.toLowerCase();

      return (
        product.name?.toLowerCase().includes(search) ||
        product.description?.toLowerCase().includes(search)
      );
    });

    switch (selectedSort) {
      case "Price Low to High":
        filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
        break;

      case "Price High to Low":
        filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
        break;

      case "Popularity":
      default:
        filteredProducts.sort(
          (a, b) => Number(b.popularity) - Number(a.popularity),
        );
        break;
    }

    return filteredProducts;
  }, [products, searchText, selectedSort]);

  return (
    <section className="product-listings">
      <div className="product-toolbar">
        <SearchBox
          label="Search"
          placeholder="Search stickers..."
          value={searchText}
          handleSearch={setSearchText}
        />

        <Dropdown
          label="Sort By"
          options={sortList}
          value={selectedSort}
          handleSort={setSelectedSort}
        />
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="no-products">
          <h3>No products found.</h3>
        </div>
      ) : (
        <div className="products-grid">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
