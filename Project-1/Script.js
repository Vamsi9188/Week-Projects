 // Product Variants Handling
      const colorSelect = document.getElementById("color");
      const sizeSelect = document.getElementById("size");
      const materialSelect = document.getElementById("material");
      const productDetails = document.querySelector(".product-details");
      const productImage = document.getElementById("product_image");

      const variantImages = {
        red: {
          small: {
            cotton: "images/red-small-cotton.jpeg",
            polyester: "images/red-small-polyester.jpeg",
            wool: "images/red-small-wool.jpeg",
          },
          medium: {
            cotton: "images/red-medium-cotton.jpeg",
            polyester: "images/red-medium-polyester.jpeg",
            wool: "images/red-medium-wool.jpeg",
          },
          large: {
            cotton: "images/red-large-cotton.jpeg",
            polyester: "images/red-large-polyester.jpeg",
            wool: "images/red-large-wool.jpeg",
          },
        },
        blue: {
          small: {
            cotton: "images/blue-small-cotton.jpeg",
            polyester: "images/blue-small-polyester.jpeg",
            wool: "images/blue-small-wool.jpeg",
          },
          medium: {
            cotton: "images/blue-medium-cotton.jpeg",
            polyester: "images/blue-medium-polyester.jpeg",
            wool: "images/blue-medium-wool.jpeg",
          },
          large: {
            cotton: "images/blue-large-cotton.jpeg",
            polyester: "images/blue-large-polyester.jpeg",
            wool: "images/blue-large-wool.jpeg",
          },
        },
        green: {
          small: {
            cotton: "images/green-small-cotton.jpeg",
            polyester: "images/green-small-polyester.jpeg",
            wool: "images/green-small-wool.jpeg",
          },
          medium: {
            cotton: "images/green-medium-cotton.jpeg",
            polyester: "images/green-medium-polyester.jpeg",
            wool: "images/green-medium-wool.jpeg",
          },
          large: {
            cotton: "images/green-large-cotton.jpeg",
            polyester: "images/green-large-polyester.jpeg",
            wool: "images/green-large-wool.jpeg",
          },
        },
      };

      colorSelect.addEventListener("change", updateProductDetails);
      sizeSelect.addEventListener("change", updateProductDetails);
      materialSelect.addEventListener("change", updateProductDetails);

      function updateProductDetails()
      {
        productDetails.classList.add("fade-out");
        setTimeout(() => {
          const color = colorSelect.value;
          const size = sizeSelect.value;
          const material = materialSelect.value;

          document.getElementById("product_description").textContent = `${
            color.charAt(0).toUpperCase() + color.slice(1)
          } ${size.charAt(0).toUpperCase() + size.slice(1)} ${
            material.charAt(0).toUpperCase() + material.slice(1)
          } T-shirt`;
          document.getElementById("product_price").textContent = `$${(
            100 +
            Math.random() * 10
          ).toFixed(2)}`;

          // Update product image based on selected variant
          productImage.src = variantImages[color][size][material];

          productDetails.classList.remove("fade-out");
          productDetails.classList.add("fade-in");
        }, 500);
      }

      productDetails.addEventListener("animationend", () => {
        productDetails.classList.remove("fade-in");
      });

      // Quantity Selector Validation
      const quantityInput = document.getElementById("quantity_input");
      const decreaseBtn = document.getElementById("decrease_quantity");
      const increaseBtn = document.getElementById("increase_quantity");
      const stockMessage = document.getElementById("stock_message");

      decreaseBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
          quantityInput.value = quantity - 1;
          stockMessage.textContent = "";
        } else {
          stockMessage.textContent = "Cannot go below 1";
        }
      });

      increaseBtn.addEventListener("click", () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity < 10)
        {
          quantityInput.value = quantity + 1;
          stockMessage.textContent = "";
        } 
        else
        {
          stockMessage.textContent = "Maximum stock is 10";
        }
      });

      // Add to Cart
      const addToCartBtn = document.getElementById("add_to_cart");
      const cartMessage = document.getElementById("cart_message");

      addToCartBtn.addEventListener("click", () => {
        const cartItem = {
          color: colorSelect.value,
          size: sizeSelect.value,
          material: materialSelect.value,
          quantity: quantityInput.value,
          price: document.getElementById("product_price").textContent,
        };

        localStorage.setItem("cart", JSON.stringify(cartItem));
        cartMessage.textContent = "Product added to cart!";
      });

      // Product Image Zoom and Modal
      const modal = document.getElementById("image_modal");
      const modalImg = document.getElementById("modal_image");
      const modalCaption = document.getElementById("caption");
      const openModalBtn = document.getElementById("open_modal_button");
      const closeModalBtn = document.getElementsByClassName("close")[0];

      openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = productImage.src;
        modalCaption.textContent = "Product Image Zoom";
      });

      closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });

      // Customer Reviews
      const reviews = [
        { rating: 5, date: "2024-09-10", comment: "Amazing product!" },
        { rating: 4, date: "2024-08-25", comment: "Very comfortable" },
        { rating: 3, date: "2024-07-05", comment: "It’s okay." },
        { rating: 5, date: "2024-08-15", comment: "Loved it!" },
      ];

      function renderReviews(filteredReviews)
      {
        const reviewsList = document.getElementById("reviews_list");
        reviewsList.innerHTML = "";
        filteredReviews.forEach((review) => {
          const reviewItem = document.createElement("div");
          reviewItem.classList.add("review-item");
          reviewItem.innerHTML = `<p>${"★".repeat(review.rating)} ${
            review.comment
          } - <small>${review.date}</small></p>`;
          reviewsList.appendChild(reviewItem);
        });
      }

      // Initial render
      renderReviews(reviews);

      // Filtering Reviews
      const filterRatingSelect = document.getElementById("filter_rating");
      const filterDateSelect = document.getElementById("filter_date");
      filterRatingSelect.addEventListener("change", filterReviews);
      filterDateSelect.addEventListener("change", filterReviews);
      function filterReviews()
      {
        let filteredReviews = reviews;
        const selectedRating = filterRatingSelect.value;
        const selectedDateSort = filterDateSelect.value;
        if (selectedRating !== "all")
        {
          filteredReviews = filteredReviews.filter(
            (review) => review.rating == selectedRating
          );
        }
        if (selectedDateSort === "newest")
        {
          filteredReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        else
        {
          filteredReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        renderReviews(filteredReviews);
      }
