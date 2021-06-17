let cars = [
    // {
    //   name: "Mazda 2",
    //   model: "2019",
    //   doors: 5,
    //   color: "red",
    //   brand: "mazda"
    // }
  ];


//funcion para hacer toggle sobre el formulario
function toggleForm(){
    const menuToggle = document.getElementById("formMenu");
    menuToggle.classList.toggle("open");
};


// CRUD---------------------------------------------------------------------


//variable para renderizado de cada registro
let renderListUI = document.getElementById("newRegister");

//variable que contiene formulario
let saveForm = document.getElementById("addCar");

//condicional para crear o editar
let conditionalCrud = false;
let updateIndex = null;


//local Storage
const carStorage = () => {
    if(typeof(Storage) != "undefined"){
        localStorage.setItem("car", JSON.stringify(cars));
    }else{
        alert("ERROR");
    }
};



//funcion principal
const principalFunction = () => {
    
    renderListUI.innerHTML = "";
    carsList = cars;
    carsList = JSON.parse(localStorage.getItem("car"));

    //forEach
    carsList.forEach((element, index) =>{

        //contendedor items
        let itemCar = document.createElement('div');
        itemCar.setAttribute("class", "carItem");
        renderListUI.appendChild(itemCar);

        //contenedor info
        let infoCar = document.createElement('div');
        infoCar.setAttribute("class", "infoCar");
        itemCar.appendChild(infoCar);

        //inserta de informacion
        let nameCar = document.createElement('p');
        nameCar.innerText = `${element.name}`;

        let modelCar = document.createElement('p');
        modelCar.innerText = `${element.model}`;

        let doorCar = document.createElement('p');
        doorCar.innerText = `${element.doors}`;

        let colorCar = document.createElement('p');
        colorCar.innerText = `${element.color}`;

        let brandCar = document.createElement("p");
        brandCar.innerText = `${element.brand}`;


        infoCar.appendChild(nameCar);
        infoCar.appendChild(modelCar);
        infoCar.appendChild(doorCar);
        infoCar.appendChild(colorCar);
        infoCar.appendChild(brandCar);


        //crea de botones editar y borrar
        let divButtons = document.createElement('div');
        divButtons.setAttribute("class", "buttonsAC");
        itemCar.append(divButtons);


        //boton de editar
        const updateBtn = document.createElement('button');
        updateBtn.setAttribute("class", "update");
        updateBtn.setAttribute("id", "update");
        updateBtn.innerText = "Update";
        updateBtn.addEventListener("click", () => updateRegister(element, index));

        //boton de borrar
        const deletBtn = document.createElement('button');
        deletBtn.setAttribute('class', "delete");
        deletBtn.setAttribute('id', 'delete');
        deletBtn.innerText = "Delete";
        deletBtn.addEventListener("click", () => deleteRegister(index));

        //agg btn
        divButtons.appendChild(updateBtn);
        divButtons.appendChild(deletBtn);
    });
};


//funcion para crear y editar registros
const createUpdateRegister = event => {
    event.preventDefault();
    if(conditionalCrud){
        let updateRG = {
            name: document.getElementById("nameOfCar").value,
            model: document.getElementById("modelOfCar").value,
            doors: document.getElementById("doors").value,
            color: document.getElementById("colorCar").value,
            brand: document.getElementById("brandOfCar").value
        };

        carsList[updateIndex] = updateRG;

        conditionalCrud = false;
        updateIndex = null;
        principalFunction();
    }else{
        let car = {
            name: document.getElementById("nameOfCar").value,
            model: document.getElementById("modelOfCar").value,
            doors: document.getElementById("doors").value,
            color: document.getElementById("colorCar").value,
            brand: document.getElementById("brandOfCar").value
        };
        carsList.push(car);
        carStorage();
        principalFunction();
    }
    saveForm.reset();
};

//funcion de editar (rellena los campos)
let updateRegister = (element, index) => {
    conditionalCrud = true;
    updateIndex = index;
    document.getElementById("nameOfCar").value = element.name,
    document.getElementById("modelOfCar").value = element.model,
    document.getElementById("doors").value = element.doors,
    document.getElementById("colorCar").value = element.color,
    document.getElementById("brandOfCar").value = element.brand
};


//funcion de eliminar
let deleteRegister = index => {
    carsList.splice(index, 1);
    principalFunction();
};

//eventos escuchados formulario y listas
saveForm.addEventListener("submit", createUpdateRegister);
document.addEventListener("DOMContentLoaded", principalFunction);