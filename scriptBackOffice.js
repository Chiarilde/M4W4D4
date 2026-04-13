const formHtml = document.getElementById("create-form");
const inputName = document.getElementById("name");
const inputDescription = document.getElementById("description");
const inputBrand = document.getElementById("brand");
const inputImage = document.getElementById("image");
const inputPrice = document.getElementById("price");
const editForm = document.getElementById("edit-form");
const inputId = document.getElementById("_id");

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
        createList(res);
    } catch (error) {
        console.error(error);
    }
};

//FUNZIONE CHE CREA UN PRODOTTO
async function createProduct(e) {
    e.preventDefault();

    const form = new FormData(this);
    const product = {
        name: form.get("name"),
        description: form.get("description"),
        brand: form.get("brand"),
        imageUrl: form.get("image"),
        price: form.get("price"),
    };

    try {
        await fetch("https://striveschool-api.herokuapp.com/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2YTU4OTUzMjU4OTAwMTU2MjAzMWEiLCJpYXQiOjE3NzU2NzQ3NjEsImV4cCI6MTc3Njg4NDM2MX0.vyOY-fG0CvLv7xvjawZBAnn-w6ea2FzjMRRcWtpaPmk",
            },

            body: JSON.stringify(product),
        });
        formHtml.reset();
        location.reload();
    } catch (error) {
        console.error(error);
    }
}

//FUNZIONE CHE MODIFICA UN PRODOTTO
async function editProduct(event) {
    event.preventDefault();
    const form = new FormData(this);
    const product = {
        _id: form.get("id"),
        name: form.get("name"),
        description: form.get("description"),
        brand: form.get("brand"),
        imageUrl: form.get("image"),
        price: form.get("price"),
    };
    try {
        await fetch(
            `https://striveschool-api.herokuapp.com/api/product/${product._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2YTU4OTUzMjU4OTAwMTU2MjAzMWEiLCJpYXQiOjE3NzU2NzQ3NjEsImV4cCI6MTc3Njg4NDM2MX0.vyOY-fG0CvLv7xvjawZBAnn-w6ea2FzjMRRcWtpaPmk",
                },

                body: JSON.stringify(product),
            },
        );
        window.location.reload();
    } catch (error) {
        console.error(error);
    }
}

formHtml.addEventListener("submit", createProduct);
editForm.addEventListener("submit", editProduct);

//FUNZIONE CHE CANCELLA UN PRODOTTO
const deleteProduct = async (product) => {
    try {
        await fetch(
            `https://striveschool-api.herokuapp.com/api/product/${product._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWQ2YTU4OTUzMjU4OTAwMTU2MjAzMWEiLCJpYXQiOjE3NzU2NzQ3NjEsImV4cCI6MTc3Njg4NDM2MX0.vyOY-fG0CvLv7xvjawZBAnn-w6ea2FzjMRRcWtpaPmk",
                },
                body: JSON.stringify(product),
            },
        );
    } catch (error) {
        console.error(error);
    }
};
//FUNZIONE CHE CREA LA LISTA NELLA PAGINA DI BACK OFFICE
const createList = (products) => {
    const table = document.createElement("table");
    table.classList = "table table-striped";
    const tbody = document.createElement("tbody");
    const thead = document.createElement("thead");
    thead.innerHTML = `<tr><th># ID</th>
<th>Product Name</th></tr>`;
    table.append(tbody, thead);
    document.body.appendChild(table);

    products.forEach((p) => {
        const td = document.createElement("td");
        const button = document.createElement("button");
        const editButton = document.createElement("button");
        td.append(editButton, button);
        button.addEventListener("click", (e) => {
            const index = e.target.parentElement.parentElement.rowIndex - 1;
            deleteProduct(p);
            tbody.deleteRow(index);
        });
        button.innerText = "X";
        editButton.innerText = "✏️";
        editButton.classList = "btn btn-outline-warning mr-4";
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#exampleModal");
        editButton.addEventListener("click", () => {
            inputName.value = p.name;
            inputDescription.value = p.description;
            inputBrand.value = p.brand;
            inputImage.value = p.imageUrl;
            inputPrice.value = p.price;
            inputId.value = p._id;
        });

        button.classList = "btn btn-outline-danger";
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td><h6>${p._id}</h6></td>
        <td><p>${p.name}</p></td>
    `;
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
};

fetchProduct();
