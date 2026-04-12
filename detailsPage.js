const params = new URLSearchParams(window.location.search);
const _id = params.get("id");

const createDiv = (product) => {
    const card = document.createElement("card");
    card.classList = "card mx-auto m-5";
    card.style.width = "22rem";
    card.style.height = "30rem";
    card.innerHTML = `
            <img class="card-img-top" height="320" src="${product.imageUrl}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text text-truncate">${product.description}</p>
                <div class="d-flex justify-content-between">
                    <b>${product.price}€</b>
                </div>
            </div>
        `;
    document.body.appendChild(card);
};

const fetchProductById = async (id) => {
    try {
        const response = await fetch(
            `https://striveschool-api.herokuapp.com/api/product/${id}`,
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

fetchProductById(_id);
