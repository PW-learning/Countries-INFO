// Elements
let s = document.getElementById("show")
let inp = document.getElementById("search")
let url = "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;callingCodes;capital;timezones;nativeName;currencies;flag"

// Events
inp.addEventListener("keyup", () => {
    getRez()
})

// functions
getRez()
function getRez(){
    s.innerHTML = ""
    fetch(url)
    .then(u => u.json())
    .then(d => {
        let x = d.filter(v => {
            return v.name.toLowerCase().startsWith(inp.value.toLowerCase()) || v.callingCodes.includes(inp.value)
        })
        x.forEach(r => {

            const wrp = document.createElement("div")
            wrp.className = "wrp"
            wrp.innerHTML = `
            <div class="head">
                <div>
                <img src="${r.flag}" alt="${r.name}" width="40" />
                <span>${r.name}</span>
                <span>+${r.callingCodes}</span>
                </div>
                <span class="arr">↕️</span>
            </div>
            <div class="body hid">
                <p>
                <span>Local Name : ${r.nativeName}</span>
                <span>Capital : ${r.capital}</span>
                </p>
                <p>
                <span>Currency : ${r.currencies[0].code} ${r.currencies[0].symbol}</span>
                <span>Time Zone(s) : ${r.timezones}</span>
                </p>
                <p>
                <span>Short Names : ${r.alpha2Code}, </span>
                <span>${r.alpha3Code}</span>
                </p>
                <div class="body-details">
                    Learn more on Google maps :<br />
                    <a href="https://www.google.com/maps/place/${r.nativeName}/?hl=ar" target="_blank">
                        Arabic
                    </a> - 
                    <a href="https://www.google.com/maps/place/${r.nativeName}/?hl=en" target="_blank">
                        English
                    </a> - 
                    <a href="https://www.google.com/maps/place/${r.nativeName}/?hl=tr" target="_blank">
                        Türkçe
                    </a>
                </div>
            </div>
            `
            s.appendChild(wrp)
        });
        let j = document.querySelectorAll(".arr")
        j.forEach(v => {
            v.addEventListener("click", () => {
                 v.parentElement.nextElementSibling.classList.toggle("hid")
            })
        })
    })
}