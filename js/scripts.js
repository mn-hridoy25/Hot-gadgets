const loadphone = async (searchText = '2021', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll)
    // console.log(phones);
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container')
    // console.log(phones);
    phoneContainer.textContent = '';

    const showAllButton = document.getElementById('show-all-button')
    if (phones.length > 12 && !isShowAll) {
        showAllButton.classList.remove('hidden')
    }
    else {
        showAllButton.classList.add('hidden')
    }
    // console.log('is show all', isShowAll);

    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 text-black bg-slate-300 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title font-bold">${phone.phone_name}</h2>
                        <h3 class="card-title">${phone.brand}</h3>
                        <p>If a man chews phone whose phone does he choose?</p>
                        <div class="card-actions">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard)
    });

    handleSpinner(false)
}

const handleSearch = (isShowAll) => {
    handleSpinner(true)
    const inputField = document.getElementById('input-field')
    const searchText = inputField.value;
    // console.log(searchText);
    loadphone(searchText, isShowAll);
}

// loader handle
const handleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner')
    if (isLoading) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden')
    }
}


// show all button handle
const handleShowAll = () => {
    handleSearch(true)
}

// show details button handle
const handleShowDetails = async (slug) => {
    // console.log(slug);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data

    showModalDetails(phone)
}

// show modal handle
const showModalDetails = (phone) => {
    const phoneName = document.getElementById('show-details-phone-name')
    phoneName.innerText = phone.name

    const showDetailsContainer = document.getElementById('show_details_container')
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}">
    <h2><span class="text-lg font-medium">Brand: </span>${phone?.brand}</h2>
    <h2><span class="text-lg font-medium">Storage: </span>${phone?.mainFeatures?.storage}</h2>
    <h2><span class="text-lg font-medium">Display: </span>${phone?.mainFeatures?.displaySize}</h2>
    <h2><span class="text-lg font-medium">Sensors: </span>${phone?.mainFeatures?.sensors}</h2>
    <h2><span class="text-lg font-medium">ChipSet: </span>${phone?.mainFeatures?.chipSet}</h2>
    <h2><span class="text-lg font-medium">Bluetooth: </span>${phone?.others?.Bluetooth}</h2>
    <h2><span class="text-lg font-medium">GPS: </span>${phone?.others?.GPS}</h2>
    <h2><span class="text-lg font-medium">NFC: </span>${phone?.others?.NFC}</h2>
    <h2><span class="text-lg font-medium">Radio: </span>${phone?.others?.Radio}</h2>
    <h2><span class="text-lg font-medium">USB: </span>${phone?.others?.USB}</h2>
    <h2><span class="text-lg font-medium">WLAN: </span>${phone?.others?.WLAN}</h2>
    <h2><span class="text-lg font-medium">Release Date: </span>${phone?.releaseDate}</h2>
    `

    console.log(phone);
    show_details_modal.showModal()
}

loadphone()