const container = document.getElementById("products");

//FUNZIONA CHE PRENDE TUTTI I PRODOTTI
const fetchProduct = async () => {
    try {
        const response = await fetch(
            "https://striveschool-api.herokuapp.com/api/product",
            {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2YTU4OTUzMjU4OTAwMTU2MjAzMWEiLCJpYXQiOjE3NzU2NzQ3NjEsImV4cCI6MTc3Njg4NDM2MX0.vyOY-fG0CvLv7xvjawZBAnn-w6ea2FzjMRRcWtpaPmk",
                },
            },
        );
        const res = await response.json();
        createDiv(res);
    } catch (error) {
        console.error(error);
    }
};

const createDiv = (products) =>
    products.forEach((p) => {
        const card = document.createElement("card");
        card.classList = "card";
        card.style.width = "18rem";
        card.style.height = "21rem";
        card.innerHTML = `
            <img class="card-img-top" height="180" src="${p.imageUrl}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text text-truncate">${p.description}</p>
                <div class="d-flex justify-content-between">
                    <b>${p.price}€</b>
                    <a href="./product-details.html?id=${p._id}" class="btn btn-info">Detail</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

fetchProduct();
