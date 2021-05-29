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
            return v.name.toLowerCase().startsWith(inp.value.toLowerCase()) || v.alpha2Code.toLowerCase().startsWith(inp.value.toLowerCase())
        })
        x.forEach(r => {

            const wrp = document.createElement("div")
            wrp.className = "wrp"
            wrp.innerHTML = `
            <div class="head">
                <img src="${r.flag}" alt="${r.name}" width="20" />
                <span>${r.name}</span>
                <span>${r.callingCodes}</span>
                <span class="arr">↕️</span>
            </div>
            <div class="body hid">
                <span>Local Name : ${r.nativeName}</span>
                <span>Capital : ${r.capital}</span>
                <span>Currency : ${r.currencies[0].code} ${r.currencies[0].symbol}</span>
                <span>Time Zone(s) : ${r.timezones}</span>
                <span>Short Names : ${r.alpha2Code}, </span>
                <span>${r.alpha3Code}</span>
                <div>
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
        j.forEach((v,i) => {
            v.addEventListener("click", () => {
                v.parentNode.nextElementSibling.classList.toggle("hid")
            })
        })
    })
}