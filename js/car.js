import data from './data.js'

let car_info= document.querySelector(".car-info")
console.log(data)

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

function carDetailp(item){
        let formattedPrice = item.price.toLocaleString('fr-FR');
        let formattedkm = item.odometer.toLocaleString('fr-FR');
        let engineInfo = item.engine ? `${item.engine} L,` : '';
        return`
        <div class="car-head" >
                    <h2>${item.brand} ${item.model}, ${engineInfo} ${item.year} il, ${formattedkm} ${item.odometerUnit}</h2>
                    <div class="car-head-right">
                        <a href="#"><i class="fa-regular fa-heart"></i><span>Seçilmişlərdə saxla</span></a>
                        <a href="#"><i class="fa-regular fa-flag"></i><span>Şikayət et</span></a>
                    </div>
                </div>
                <div class="car-content">
                    <div class="car-img-prop">
                        <img src=${item.images} alt="">
                        <div class="car-price-tel">
                            <h3>${formattedPrice} ${item.currency}</h3>
                            <hr>
                            <div class="owner">
                                <span>${item.city}</span>
                                <i class="fa-solid fa-circle-user"></i>
                            </div>
                            <a href="#"><i class="fa-solid fa-phone" style="color: white;"></i>(055) 221-74-74</a>
                        </div>
                    </div>
                        <div class="properties">
                            <div class="prop">
                                <ul class="prop-key">
                                    <li>Şəhər</li>
                                    <li>Marka</li>
                                    <li>Model</li>
                                    <li>Buraxilish ili</li>
                                    <li>Ban novu</li>
                                    <li>Reng</li>
                                    <li>Muherrik</li>
                                    <li>Yurush</li>
                                </ul>
                                <ul class="prop-value">
                                    <li>${item.city}</li>
                                    <li>${item.brand}</li>
                                    <li>${item.model}</li>
                                    <li>${item.year}</li>
                                    <li>${item.banType}</li>
                                    <li>Qara</li>
                                    <li>${engineInfo}</li>
                                    <li>${formattedkm} ${item.odometerUnit}</li>
                                </ul>
                            </div>
                            <div class="prop">
                                <ul class="prop-key">
                                    <li>Suretler qutusu</li>
                                    <li>Oturucu</li>
                                    <li>Yeni</li>
                                    <li>Sahibler</li>
                                    <li>Veziyyeti</li>
                                    <li>Hansi bazar ucun yigilib</li>
                                </ul>
                                <ul class="prop-value">
                                    <li>Mexaniki</li>
                                    <li>On</li>
                                    <li>Beli</li>
                                    <li>1</li>
                                    <li>Vuruğu yoxdur, rənglənməyib</li>
                                    <li>Avropa</li>
                                </ul>
                            </div>
                        </div>
                    
                    
                </div>
        `
    }


    let carIndex = getQueryParams();
    if (carIndex !== null && data[carIndex]) {
        car_info.innerHTML = carDetailp(data[carIndex]);
    } else {
        car_info.innerHTML = "<p>Car not found!</p>";
    }