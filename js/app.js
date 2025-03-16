import data from './data.js'

let output = document.querySelector(".cars")

console.log(data)


const mapCars = data.map(
  (item) => {
    let formattedPrice = item.price.toLocaleString('fr-FR');
    let formattedkm = item.odometer.toLocaleString('fr-FR');
    let engineInfo = item.engine ? `${item.engine} L` : '';
    
    return `
        <a href="car.html?id=${item.id}" class="card" target="_blank">
        <div class="bookmarks">
            <i class="fa-regular fa-heart" id="like-${item.id}"></i>
            <i class="fa-solid fa-heart" style="display:none" id="dislike-${item.id}"></i>
        </div>
            <img src=${item.images} alt="">
            <div class="car-text">
                <h3>${formattedPrice} ${item.currency}</h3>
                <p>${item.brand} ${item.model}</p>
                <p>${item.year} ${engineInfo ? `, ${engineInfo}` : ''}, ${formattedkm} ${item.odometerUnit}</p>
                <span>${item.city} ${item.dates}</span>
            </div>
        </a>
    `;
  }
);


output.innerHTML = mapCars.join("")





//bookmarks

document.addEventListener('DOMContentLoaded', function() {
  let storedCars = JSON.parse(localStorage.getItem('selected_cars'));
  if (storedCars) {
    selected_cars = storedCars;
    selectYarat(); 
  }
  updateLikeButtons(); 
});

function updateLikeButtons() {
  selected_cars.forEach((item, index) => {
    const likeButton = document.getElementById(`like-${item.id}`);
    const dislikeButton = document.getElementById(`dislike-${item.id}`);

    if (likeButton && dislikeButton) {
      likeButton.style.display = "none";
      dislikeButton.style.display = "block";
    }
  });
}

data.forEach((item, index) => {
  const likeButton = document.getElementById(`like-${item.id}`);
  const dislikeButton = document.getElementById(`dislike-${item.id}`);

  if (likeButton && dislikeButton) {
    likeButton.onclick = function(event) {
      event.preventDefault();
      likeButton.style.display = "none";
      dislikeButton.style.display = "block";
      selectEkle(item); 
    }

    dislikeButton.onclick = function(event) {
      event.preventDefault();
      dislikeButton.style.display = "none";
      likeButton.style.display = "block";
      cixar(item.id); 
    }
  }
});

let selected_cars = [];

function selectEkle(item) {
  let mevcutMəhsul = selected_cars.find(car => car.id === item.id);
  if (!mevcutMəhsul) {
    selected_cars.push(item);
  }
  localStorage.setItem('selected_cars', JSON.stringify(selected_cars)); 
  selectYarat();
}

function selectYarat() {
  let liked_cars = document.querySelector('.liked_cars');
  liked_cars.innerHTML = '';  

  if (selected_cars.length === 0) {
    liked_cars.innerHTML = `<div class="not_liked">
            <img src="https://turbo.azstatic.com/assets/shared/bookmarks/bookmarks-bg-da37770522e510318ac5c34e9532f2c28225f6e90d3a5736176dadd131f973db.svg" alt="">
            <p>Bəyəndiyiniz elanları ürək işarəsinə klik edərək seçilmişlərə əlavə edin.</p>
        </div>`;
  } else {
  selected_cars.forEach((item) => {
    let itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    let formattedPrice = item.price.toLocaleString('fr-FR');
    let formattedkm = item.odometer.toLocaleString('fr-FR');
    let engineInfo = item.engine ? `${item.engine} L` : '';
    
    itemDiv.innerHTML = `
      <a href="car.html?id=${item.id}" class="card" target="_blank">
        <div class="bookmarks">
          <i class="fa-regular fa-heart" id="like-${item.id}" style="display:none"></i>
          <i class="fa-solid fa-heart" id="dislike-${item.id}" style="display:block"></i>
        </div>
        <img src=${item.images} alt="">
        <div class="car-text">
          <h3>${formattedPrice} ${item.currency}</h3>
          <p>${item.brand} ${item.model}</p>
          <p>${item.year} ${engineInfo ? `, ${engineInfo}` : ''}, ${formattedkm} ${item.odometerUnit}</p>
          <span>${item.city} ${item.dates}</span>
        </div>
      </a>
    `;
    liked_cars.appendChild(itemDiv);
  });
  }
}

function cixar(id) {
  selected_cars = selected_cars.filter(item => item.id !== id);
  localStorage.setItem('selected_cars', JSON.stringify(selected_cars));
  selectYarat();
  updateLikeButtons();
}

let main = document.querySelector("main");
let like_head = document.querySelector(".like_head");
let bookmarks = document.getElementById("bookmarks");
bookmarks.onclick = function() {
  let liked_cars = document.querySelector('.liked_cars');
  liked_cars.style.display = "flex";
  like_head.style.display = "block";
  main.style.display = "none";
}






//Brands
const car_brands = document.getElementById('car_brands');
const sifirla = document.getElementById('sifirla');
const brands = [];
const input1 = document.getElementById("brand")
let chevron1 = document.getElementById('brand-angle')
const active = document.querySelector('.brand-active')

data.forEach(item => {
  if (!brands.includes(item.brand)) {
    brands.push(item.brand);
    const li = document.createElement('li');
    li.innerHTML = item.brand;
    li.classList.add('car-brand', 'brand-item');
    li.addEventListener('click', () => brand(item.brand, li))
    car_brands.appendChild(li);
    }
});

sifirla.onclick = function() {
  input1.value = '';
  document.querySelectorAll('.car-brand').forEach(li => {
    li.classList.remove('selected');
  });
  resetBrands(); 
  disabled.style.display='block'
  resetModels()
  model_active.style.display = 'none';
}

function brand(a, selectedLi) {
  input1.value = a;
  createModelList(a);

  document.querySelectorAll('.car-brand').forEach(li => {
    li.classList.remove('selected');
  });

  selectedLi.classList.add('selected');
  modelName=[]
  disabled.style.display='none'
  model_active.style.display='none'
  input2.value=''
}

const style = document.createElement('style');
style.innerHTML = `
  .car-brand {
    padding: 10px;
    cursor: pointer;
  }

  .car-brand.selected {
    color: red;
  }
`;
document.head.appendChild(style);

input1.addEventListener('input', () => {
  filterBrands(input1.value);
});

function filterBrands(searchTerm) {
  const brandItems = document.querySelectorAll('.brand-item');
  let found = false;

  brandItems.forEach(li => {
    li.style.display = li.textContent.toLowerCase().startsWith(searchTerm.toLowerCase()) ? 'block' : 'none';
    if (li.style.display === 'block') found = true;
  });

  document.getElementById('no-results')?.remove();

  if (!found) {
    const li = document.createElement('li');
    li.id = 'no-results';
    li.innerHTML = "Hec ne tapilmadi";
    car_brands.appendChild(li);
  }
}

function resetBrands() {
  const brandItems = document.querySelectorAll('.brand-item');
  brandItems.forEach(li => {
    li.style.display = 'block';
  });
  document.getElementById('no-results')?.remove();
}

function inputFocus() {
  car_brands.style.display = 'initial'
  chevron1.style = `
    transform:rotate(180deg);
    transition:transform .5s
  `
  active.style.display = 'none'
  input1.style = `padding-block: 12px 12px `
  if (input1.value == '') {
    input1.placeholder = "Markani yazin";
  } else {
    input1.placeholder = input1.value
    input1.value = ''
  }
}

function inputBlur() {
  car_brands.style.display = 'none'
  chevron1.style = `
    transform:rotate(0deg);
    transition:transform .5s
  `
  if (input1.value == '') {
    active.style.display = 'none'
    input1.placeholder = "Marka";
    resetBrands();
  } else {
    active.style.display = 'initial'
    input1.style = `padding-block: 18px 6px `
  }
}

function go() {
  setTimeout(inputBlur, 200)
}

input1.onfocus = inputFocus
input1.onblur = go




//Cities

let chevron2 = document.getElementById('city-angle');
let input3 = document.getElementById('city');
let cities = document.getElementById('cities');
let sifirla4 = document.getElementById('sifirla4');
let city_active = document.querySelector(".city-active");

const citylist = [];
let selectedCities = [];


data.forEach(item => {
  if (!citylist.includes(item.city)) {
      citylist.push(item.city);
      const li = document.createElement('li');
      const label = document.createElement('label'); 
      const checkbox = document.createElement('input'); 
      checkbox.type = 'checkbox';
      checkbox.id = `check-${item.city.replace(/\s+/g, '-').toLowerCase()}`;

      label.appendChild(document.createTextNode(item.city)); 
      label.appendChild(checkbox); 

      li.appendChild(label);
      li.classList.add('city-item');

      label.addEventListener('click', (e) => {
          if (e.target.tagName === 'LABEL' || e.target.tagName === 'INPUT') {
              checkbox.checked = !checkbox.checked;
              toggleCity(item.city, li, checkbox.checked);
          }
      });

      cities.appendChild(li);
  }
});


sifirla4.onclick = function() {
    input3.value = '';
    selectedCities = [];
    updateInputText();
    cities.style.display = 'none';
    document.querySelectorAll('.city-item').forEach(li => {
        li.classList.remove('selected');
        li.querySelector('input[type="checkbox"]').checked = false;
    });
    chevron2.style = `
        transform:rotate(0deg);
        transition:transform .5s;
    `;
    resetCities(); 
}

function toggleCity(city, selectedLi, isChecked) {
    const index = selectedCities.indexOf(city);
    if (isChecked) {
        if (index === -1) {
            selectedCities.push(city);
        }
    } else {
        if (index !== -1) {
            selectedCities.splice(index, 1);
        }
    }

    selectedLi.classList.toggle('selected', isChecked);
    updateInputText();
}

function updateInputText() {
    if (selectedCities.length > 0) {
        input3.value = selectedCities.join(', ');
    } else {
        input3.value = '';
        input3.placeholder = 'Şəhər';
    }
}

const style3 = document.createElement('style');
style3.innerHTML = `
    .city-item {
        padding: 10px;
        cursor: pointer;
    }

    .city-item.selected {
        color: red;
    }
`;
document.head.appendChild(style3);

function inputFocus5() {
    cities.style.display = 'block';
    chevron2.style = `
        transform:rotate(180deg);
        transition:transform .5s;
    `;
    city_active.style.display = 'none';
    input3.style = `padding-block: 12px 12px`;
  if (selectedCities.length > 0) {
    input3.value = ''; 
    input3.placeholder = selectedCities.join(', ');
} else {
    input3.placeholder = "Şəhər"; 
}
}

function inputBlur5() {
    cities.style.display = 'none';
    chevron2.style = `
        transform:rotate(0deg);
        transition:transform .5s;
    `;
  if (selectedCities.length > 0) {
    city_active.style.display = 'initial';
    input3.value = selectedCities.join(', '); 
    input3.placeholder = ''; 
    input3.style = `padding-block: 18px 6px`;
} else {
    city_active.style.display = 'none';
    input3.placeholder = "Şəhər"; 
    input3.value = '';  
}
}

document.addEventListener('click', (event) => {
    if (!cities.contains(event.target) && !input3.contains(event.target)) {
        inputBlur5();
    }
});

input3.onfocus = inputFocus5;

input3.addEventListener('input', () => {
    filtercities(input3.value);
});

function filtercities(searchTerm) {
    const cityItems = document.querySelectorAll('.city-item');
    let found = false;

    cityItems.forEach(li => {
        li.style.display = li.textContent.toLowerCase().startsWith(searchTerm.toLowerCase()) ? 'block' : 'none';
        if (li.style.display === 'block') found = true;
    });

    document.getElementById('no-results-city')?.remove();

    if (!found) {
        const li = document.createElement('li');
        li.id = 'no-results-city'; 
        li.innerHTML = "Hec ne tapilmadi";
        cities.appendChild(li);
    }
}

function resetCities() {
    const cityItems = document.querySelectorAll('.city-item');
    cityItems.forEach(li => {
        li.style.display = 'block';
    });
    document.getElementById('no-results-city')?.remove(); 
}




//Ban types

let input5 = document.getElementById("ban");
let ban_active = document.querySelector(".ban-active");
let ban_types = document.getElementById("ban-types");
let sifirla3 = document.getElementById("sifirla3");
let chevron5 = document.getElementById("ban-angle");

const banlist = [];
let selectedbans = [];

data.forEach(item => {
    if (!banlist.includes(item.banType)) {
        banlist.push(item.banType);
        const li = document.createElement('li');
        const label = document.createElement('label');
        const checkbox = document.createElement('input'); 
        checkbox.type = 'checkbox';
        checkbox.id = `check-${item.banType.replace(/\s+/g, '-').toLowerCase()}`; 

        label.appendChild(document.createTextNode(item.banType)); 
        label.appendChild(checkbox); 

        li.appendChild(label);
        li.classList.add('ban-item');
        li.addEventListener('click', (e) => {
          if (e.target.tagName === 'LABEL' || e.target.tagName === 'INPUT') {
            checkbox.checked = !checkbox.checked;
            toggleBan(item.banType, li, checkbox.checked);
        }
      });  

        ban_types.appendChild(li); 
    }
});


sifirla3.onclick = function() {
    input5.value = '';
    selectedbans = [];
    updateInputText1(); 
    ban_types.style.display = 'none';
    document.querySelectorAll('.ban-item').forEach(li => {
        li.classList.remove('selected');
        li.querySelector('input[type="checkbox"]').checked = false;
    });
    chevron5.style = `
        transform:rotate(0deg);
        transition:transform .5s;
    `;
}

function toggleBan(ban, selectedLi, isChecked) {
    const index = selectedbans.indexOf(ban);
    if (isChecked) {
        if (index === -1) {
            selectedbans.push(ban);
        }
    } else {
        if (index !== -1) {
            selectedbans.splice(index, 1);
        }
    }

    selectedLi.classList.toggle('selected', isChecked);
    updateInputText1();
}

function updateInputText1() {
    if (selectedbans.length > 0) {
        input5.value = selectedbans.join(', '); 
    } else {
        input5.value = '';
        input5.placeholder = 'Ban novu';
    }
}

const style4 = document.createElement('style');
style4.innerHTML = `
    .ban-item {
        padding: 10px;
        cursor: pointer;
    }

    .ban-item.selected {
        color: red;
    }
`;
document.head.appendChild(style4);

function inputFocus6() {
  ban_types.style.display = 'block';
  chevron5.style = `
      transform:rotate(180deg);
      transition:transform .5s;
  `;
  ban_active.style.display = 'none';
  input5.style = `padding-block: 12px 12px`;

  if (selectedbans.length > 0) {
      input5.value = '';  
      input5.placeholder = selectedbans.join(', '); 
  } else {
      input5.placeholder = "Ban novu";
  }
}

function inputBlur6() {
  ban_types.style.display = 'none';
  chevron5.style = `
      transform:rotate(0deg);
      transition:transform .5s;
  `;

  if (selectedbans.length > 0) {
      ban_active.style.display = 'initial';
      input5.value = selectedbans.join(', '); 
      input5.placeholder = '';
      input5.style = `padding-block: 18px 6px`;
  } else {
      ban_active.style.display = 'none';
      input5.placeholder = "Ban novu";
      input5.value = ''; 
  }
}

document.addEventListener('click', (event) => {
  if (!ban_types.contains(event.target) && !input5.contains(event.target)) {
      inputBlur6();
  }
});

input5.onfocus = inputFocus6;




//Years
let chevron3 = document.getElementById('ilmin')
let chevron4 = document.getElementById('ilmax')
let minil = document.getElementById('minil')
let maxil = document.getElementById('maxil')
let minyears = document.getElementById('minyears')
let maxyears = document.getElementById('maxyears')
let sifirla5 = document.getElementById('sifirla5')
let sifirla6 = document.getElementById('sifirla6')
let min_active = document.getElementById('min_active')
let max_active = document.getElementById('max_active')

let years=[]


data.forEach(item => {
  if (!years.includes(item.year)) {
      years.push(item.year);
  }
});

years.sort((a, b) => b - a);

years.forEach(year => {
  const li = document.createElement('li');
  li.innerHTML = year;
  li.classList.add('car-year');
  li.addEventListener('click', () => yearClick(year, li));
  minyears.appendChild(li);
});

sifirla5.onclick=function() {
  minil.value = '';
  document.querySelectorAll('.car-year').forEach(li => {
    li.classList.remove('selected2');
  });
}


function yearClick(b, selectedli) {
  minil.value = b;

  document.querySelectorAll('.car-year').forEach(li => {
    li.classList.remove('selected2');
  });

  selectedli.classList.add('selected2');

}

const style1 = document.createElement('style');
style1.innerHTML = `
  .car-year {
    padding: 10px;
    cursor: pointer;
  }

  .car-year.selected2 {
    color: red;
  }
`;
document.head.appendChild(style1);



function input3Focus() {
  minyears.style.display = 'initial'
  chevron3.style = `
    transform:rotate(180deg);
    transition:transform .5s
    `
  min_active.style.display = 'none'
  minil.style = `padding-block: 12px 12px `
}


function input3Blur() {
  minyears.style.display = 'none'
  chevron3.style = `
      transform:rotate(0deg);
      transition:transform .5s
    `
  if (minil.value == '') {
    min_active.style.display = 'none'

  } else {
    min_active.style.display = 'initial'
    minil.style = `padding-block: 18px 6px `
  }

}

function go3() {
  setTimeout(input3Blur, 200)
}

minil.onfocus = input3Focus
minil.onblur = go3



let myears=[]


data.forEach(item => {
  if (!myears.includes(item.year)) {
      myears.push(item.year);
  }
});

myears.sort((a, b) => b - a);

myears.forEach(year => {
  const li = document.createElement('li');
  li.innerHTML = year;
  li.classList.add('car-year');
  li.addEventListener('click', () => myearClick(year, li));
  maxyears.appendChild(li);
});

sifirla6.onclick=function() {
  maxil.value = '';
  document.querySelectorAll('.car-myear').forEach(li => {
    li.classList.remove('selected3');
  });
}


function myearClick(c, mselectedli) {
  maxil.value = c;

  document.querySelectorAll('.car-myear').forEach(li => {
    li.classList.remove('selected2');
  });

  mselectedli.classList.add('selected3');

}

const style2 = document.createElement('style');
style2.innerHTML = `
  .car-myear {
    padding: 10px;
    cursor: pointer;
  }

  .car-myear.selected2 {
    color: red;
  }
`;
document.head.appendChild(style2);



function input4Focus() {
  maxyears.style.display = 'initial'
  chevron4.style = `
    transform:rotate(180deg);
    transition:transform .5s
    `
  max_active.style.display = 'none'
  maxil.style = `padding-block: 12px 12px `
}


function input4Blur() {
  maxyears.style.display = 'none'
  chevron4.style = `
      transform:rotate(0deg);
      transition:transform .5s
    `
  if (maxil.value == '') {
    max_active.style.display = 'none'

  } else {
    max_active.style.display = 'initial'
    maxil.style = `padding-block: 18px 6px `
  }

}


function go4() {
  setTimeout(input4Blur, 200)
}

maxil.onfocus = input4Focus
maxil.onblur = go4





//Models

const car_models = document.getElementById("car_models");
const input2 = document.getElementById("model");
const chevron6 = document.getElementById("model-angle");
const sifirla2 = document.getElementById("sifirla2");
const model_active = document.querySelector(".model-active");
const disabled = document.querySelector(".disabled");

input2.onfocus = inputFocus7;

function inputFocus7() {
    chevron6.style = `
    transform:rotate(180deg);
    transition:transform .5s;
    `;
    model_active.style.display = 'none';
    input2.style = `padding-block: 12px 12px`;
    car_models.style.display = 'initial';

    if (input2.placeholder === 'Model') {
        input2.placeholder = modelName.length > 0 ? modelName.join(', ') : 'Modeli yazin';
    }

    input2.value = '';
}

let models = [];

function makeModelId(a) {
    return a.split('').join('') + 'Model';
}

function createModelList(mod) {
    models = [];
    car_models.innerHTML = '';
    car_models.innerHTML += `<li id="sifirla2"><i class="fa-solid fa-x"></i> Sifirla</li>`;

    for (const i of data) {
        let modelId = makeModelId(i.model);
        if (!models.includes(i.model) && i.brand == mod) {
            models.push(i.model);

            let li = document.createElement('li');
            let label = document.createElement('label');
            label.id = modelId;
            label.innerHTML = `${i.model} <input id="check${modelId}" type="checkbox">`;

            label.addEventListener('click', selectModel);

            li.appendChild(label);
            car_models.appendChild(li);
        }
    }

    document.querySelector('#sifirla2').onclick = resetModels;
}

function resetModels() {
    car_models.style.display = 'none';
    modelName = [];
    input2.placeholder = 'Model';
    input2.value = '';
    chevron6.style = `
    transform:rotate(0deg);
    transition:transform .5s;
  `;

    document.querySelectorAll('#car_models input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });
    document.querySelectorAll('#car_models label').forEach(label => {
        label.style.color = 'black';
    });
}

document.addEventListener('mousedown', function (b) {
    if (!car_models.contains(b.target) && b.target !== input2) {
        car_models.style.display = 'none';
        chevron6.style = `
      transform:rotate(0deg);
      transition:transform .5s;
    `;
        
        if (modelName.length > 0) {
            input2.value = modelName.join(', ');
            model_active.style.display = 'initial'; 
            input2.style = `padding-block: 18px 6px`; 
        } else {
            input2.placeholder = 'Model';
            model_active.style.display = 'none'; 
        }
    }
});

let modelName = [];

function selectModel(event) {
    let modelLabel = event.target.closest('label');
    if (!modelLabel) return;

    let modelInput = modelLabel.querySelector('input[type="checkbox"]');
    if (!modelInput) return;

    if (modelInput.checked) {
        modelLabel.style.color = 'red';
        if (!modelName.includes(modelLabel.innerText.trim())) {
            modelName.push(modelLabel.innerText.trim());
        }
    } else {
        modelLabel.style.color = 'initial';
        modelName = modelName.filter(name => name !== modelLabel.innerText.trim());
    }

    input2.placeholder = modelName.length > 0 ? modelName.join(', ') : 'Modeli yazin';
}





//daha cox filtr
let filter_hided = document.querySelector(".filter-hided")
let morefil = document.getElementById("morefil")
let more_angle = document.getElementById("more-angle")

morefil.onclick = function () {
  if (filter_hided.style.display == "block") {
    filter_hided.style.display = "none";
    morefil.innerHTML = `Daha cox filtr<i class="fa-solid fa-angle-down" id="more-angle"></i>`;
  } else {
    filter_hided.style.display = "block";
    morefil.innerHTML = `Gizlet<i class="fa-solid fa-angle-down" id="more-angle"></i>`;
  }

  more_angle = document.getElementById("more-angle");

  if (more_angle) {
    if (filter_hided.style.display == "block") {
        more_angle.style.transform = "rotate(180deg)";
        more_angle.style.transition = "transform .5s";
    } else {
        more_angle.style.transform = "rotate(0deg)";
        more_angle.style.transition = "transform .5s";
    }
  }
}





//Hamisi
// let all_cars= document.querySelector(".type_1")
let input6= document.querySelector("#input6")

document.querySelector('.type_1').classList.add('input6_checked');
input6.value = document.querySelector(".type_1").innerHTML;

document.querySelectorAll('input[name="type"]').forEach((radio, i) => {
  radio.addEventListener('change', () => selectType(i + 1));
});

function selectType(i) {
  document.querySelectorAll('.price label').forEach(label => {
    label.classList.remove('input6_checked');
  });

  document.querySelector(`.type_${i}`).classList.add('input6_checked');
  
  input6.value = document.querySelector(`.type_${i}`).innerHTML;
  console.log(input6.value);
}




//valutlar

const valist = document.querySelector(".vallist");
    const vatitle = document.querySelector(".valtitle");
    let val_angle = document.getElementById("val-angle");
    let manat = document.querySelector(".manat");
    let valItems = valist.querySelectorAll("li"); 

    vatitle.onclick = function() {
        valist.style.display = 'block'; 
        val_angle.style.transform = 'rotate(180deg)';
        val_angle.style.transition = 'transform .5s';
    };

    document.addEventListener('mousedown', function(event) {
        if (!vatitle.contains(event.target)) { 
            valist.style.display = 'none';
            val_angle.style.transform = 'rotate(0deg)';
            val_angle.style.transition = 'transform .5s';
        }
    });

    function updateColor() {
        valItems.forEach(item => {
            if(item.innerHTML == manat.innerHTML) {
                item.style.color = 'red';
            } else {
                item.style.color = 'initial';
            }
        });
    }
    updateColor();

    valItems.forEach(item => {
        item.onmousedown = function() {
            manat.innerHTML = this.innerHTML;
            updateColor(); 
            valist.style.display = 'none'; 
            val_angle.style.transform = 'rotate(0deg)';
        };
    });





//Kredit & Barter
let kredit=document.getElementById("kredit")
let barter=document.getElementById("barter")
let filterKredit = false;
let filterBarter = false;

kredit.addEventListener("click", function () {
  filterKredit = !filterKredit;
  updateButtonStyles(); 
  applyFilters();
});

barter.addEventListener("click", function () {
  filterBarter = !filterBarter;
  updateButtonStyles(); 
});

function updateButtonStyles() {
  if (filterKredit) {
    kredit.classList.add("active"); 
  } else {
    kredit.classList.remove("active"); 
  }

  if (filterBarter) {
    barter.classList.add("active");
  } else {
    barter.classList.remove("active");
  }
}





//Elanlari goster


let yazi=document.getElementById("yazi")
let redbtn=document.getElementById("redbtn")

redbtn.onclick=function(){  
  let ab
  if(input6.value == 'Yeni'){
    ab=[0]
  }
  else if(input6.value=='Surulmush'){
    ab=data.filter(value => value.odometer != 0).map(value => value.odometer)
  }
  else{
    ab=data.map(value => value.odometer)
  }

  let cardsFilter=data.filter(function(item){
    let kreditMatch = !filterKredit || (filterKredit && item.credit);
    let barterMatch = !filterBarter || (filterBarter && item.barter);
    let yearMatch = true;
    if (minil.value && !isNaN(minil.value)) {
      yearMatch = yearMatch && item.year >= minil.value;
    }
    if (maxil.value && !isNaN(maxil.value)) {
      yearMatch = yearMatch && item.year <= maxil.value;
    }
    let priceMatch = 
        (+minprice.value <= item.price && item.price <= +maxprice.value) ||
        (minprice.value === '' && maxprice.value === '') ||
        (+minprice.value <= item.price && maxprice.value === '') ||
        (minprice.value === '' && item.price <= +maxprice.value);
    
    let currencyMatch = (minprice.value !== '' || maxprice.value !== '') ? (manat.innerHTML == item.currency) : true;
    return (item.brand==input1.value || input1.value=='') &&
    (input2.value.includes(item.model) || input2.value=='') &&
    (ab.includes(item.odometer)) &&
    (input3.value.includes(item.city) || input3.value =='') &&
    (input5.value.includes(item.banType) || input5.value =='') &&
    kreditMatch &&
      barterMatch&&
      yearMatch &&
      priceMatch &&
      currencyMatch;
  })
  console.log(cardsFilter);

  if (cardsFilter.length === 0) {
    yazi.innerHTML="Azərbaycanda avtomobil satışı elanları"
    output.innerHTML = `<div class="not_found">
    <div class="not_img">
      <img src="https://turbo.azstatic.com/assets/application/placeholder-1a310ce264429c846b10a9e6783dc28a4a45b724fa7635ce7f6939598d156b8f.png" alt=""> 
    </div>
      <h5>Təəssüf ki, axtarışınız əsasında heç nə tapılmadı.</h5>
      <p>Zəhmət olmasa, daha uyğun axtarış filtrləri seçin.</p>
    </div>`;
    return ;
  }
  

  const mapCars = cardsFilter.map((item, index) => {
    let formattedPrice = item.price.toLocaleString('fr-FR');
    let formattedkm = item.odometer.toLocaleString('fr-FR');
    let engineInfo = item.engine ? `${item.engine} L` : '';
    return `
      <a href="car.html?id=${item.id}" class="card" target="_blank">
        <div class="bookmarks">
            <i class="fa-regular fa-heart" id="like-${index}"></i>
            <i class="fa-solid fa-heart" id="dislike-${index}" style="display:none"></i>
        </div>
        <img src="${item.images}" alt="">
        <div class="car-text">
          <h3>${formattedPrice} ${item.currency}</h3>
          <p>${item.brand} ${item.model}</p>
          <p>${item.year} ${engineInfo ? `, ${engineInfo}` : ''}, ${formattedkm} ${item.odometerUnit}</p>
          <span>${item.city} ${item.dates}</span>
        </div>
      </a>
    `;
  });

  output.innerHTML = mapCars.join("");
}




//Sifirla

let all_sif=document.getElementById("all_sif")

all_sif.onclick=function(){
  input5.value = '';
    selectedbans = [];
    updateInputText1(); 
    ban_types.style.display = 'none';
    input1.value = '';
    document.querySelectorAll('.car-brand').forEach(li => {
      li.classList.remove('selected');
    });
    resetBrands();
    disabled.style.display='block'
    resetModels()
    model_active.style.display = 'none';
    active.style.display='none'
    input3.value = '';
    selectedCities = [];
    updateInputText();
    cities.style.display = 'none';
    document.querySelectorAll('.city-item').forEach(li => {
        li.classList.remove('selected');
        li.querySelector('input[type="checkbox"]').checked = false;
    });
    resetCities(); 
    input5.value = '';
    selectedbans = [];
    updateInputText1(); 
    ban_types.style.display = 'none';
    document.querySelectorAll('.ban-item').forEach(li => {
        li.classList.remove('selected');
        li.querySelector('input[type="checkbox"]').checked = false;
    });
    minil.value = '';
  document.querySelectorAll('.car-year').forEach(li => {
    li.classList.remove('selected2');
  });
  min_active.style.display = 'none'
  maxil.value = '';
  document.querySelectorAll('.car-myear').forEach(li => {
    li.classList.remove('selected3');
  });
  max_active.style.display = 'none'
  resetModels()
  maxprice.value =''
  minprice.value =''
  kredit.classList.remove("active");
  barter.classList.remove("active");
  manat.innerHTML='AZN'
  document.querySelectorAll('.price label').forEach(label => {
    label.classList.remove('input6_checked');
  });
  document.querySelector('.type_1').classList.add('input6_checked');
  input6.value = document.querySelector(".type_1").innerHTML;

}