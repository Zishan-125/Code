
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase(); // Fixed `ariaValueMax` to `value`
    const storeitems = document.getElementById("product-list"); // This is not used, but keeping it for context
    const products = document.querySelectorAll(".product"); // Corrected `product` variable to `products`
    const productNames = document.getElementsByTagName("h2"); // Fixed `product__name` variable naming

    for (let i = 0; i < productNames.length; i++) {
        let match = products[i].getElementsByTagName("h2")[0]; // Ensure accessing `products[i]` correctly

        if (match) {
            let textValue = match.textContent || match.innerHTML;

            if (textValue.toUpperCase().indexOf(searchbox) > -1) {
                products[i].style.display = ""; // Show the product
            } else {
                products[i].style.display = "none"; // Hide the product
            }
        }
    }
};

