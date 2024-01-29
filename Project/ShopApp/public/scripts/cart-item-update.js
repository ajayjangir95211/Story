const cartItemUpdateForm = document.querySelectorAll(".cart-item-update");

async function updateCartItem(event) {
    event.preventDefault();
    const form = event.target;
    const productid = form.dataset.productid;
    const csrfToken = form.dataset.csrf;
    const quantity = form.firstElementChild.value;

    let response;
    try {
        response = await fetch("/cart/items", {
            method: "PATCH",
            body: JSON.stringify({
                productid: productid,
                quantity: quantity,
                _csrf: csrfToken
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

    } catch (error) {
        console.log("Here");
        alert("Something Went Wrong!");
        return;
    }

    if (!response.ok) {

        alert("Something Went Wrong!");
        return;
    }

    const responseData = await response.json();
    console.log(responseData);

    if (responseData.updatedItemPrice === 0)
        form.parentElement.remove();
    else
        form.parentElement.querySelector(".cart-item-price").textContent = responseData.updatedItemPrice;
    document.querySelector("#cart-total-price").textContent = responseData.newTotalPrice;
    document.querySelectorAll(".nav-items .badge").forEach((e) => {
        e.textContent = responseData.newTotalQuantity;
    })
}

for (const form of cartItemUpdateForm) {
    form.addEventListener("submit", updateCartItem);
}