const addToCartBtn = document.querySelector("#product-details button");
const cartBadge = document.querySelectorAll(".nav-items .badge");
const csrfToken = addToCartBtn.dataset.csrf;

async function addToCart() {
    const productid = addToCartBtn.dataset.productid;
    let response;
    try {
        response = await fetch("/cart/items", {
            method: "post",
            body: JSON.stringify({
                productid: productid,
                _csrf: csrfToken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        alert("Something Went Wrong!");
        return;
    }

    if (!response.ok) {
        alert("Something Went Wrong!");
        return;
    }

    const responseData = await response.json();
    console.log(responseData);
    const newTotalQuantity = responseData.newTotal;
    cartBadge.forEach((e) => {
        e.textContent = newTotalQuantity;
    })
}

addToCartBtn.addEventListener("click", addToCart);