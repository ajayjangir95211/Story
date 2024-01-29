const productDeleteButtons = document.querySelectorAll(".product-item-actions button");

async function deleteProduct(event) {
    const btn = event.target;
    const productid = btn.dataset.productid;
    const csrfToken = btn.dataset.csrf;

    const response = await fetch("/admin/products/" + productid + "?_csrf=" + csrfToken, {
        method: "DELETE",
    });

    if (!response.ok) {
        alert("Wrong!");
        return
    }

    btn.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const btn of productDeleteButtons) {
    btn.addEventListener("click", deleteProduct);
}