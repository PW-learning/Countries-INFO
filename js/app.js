// Elements
let s = document.getElementById("show")
let inp = document.getElementById("search")
let url = "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;alpha3Code;callingCodes;capital;timezones;nativeName;currencies;flag;region;languages"

// Events
inp.addEventListener("keyup", () => {
    getRez()
})

// functions
getRez()

function getRez() {
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
                let ls = r.languages.map(l => {
                    return l.name;
                })
                let languagesNames = ls.map(l => {
                    return ` ${l}`;
                })
                wrp.innerHTML = `
            <div class="head">
                <div>
                <img src="${r.flag}" alt="${r.name}'s flag" width="30" />
                <span>${r.name}</span>
                <span>+${r.callingCodes}</span>
                </div>
                <span class="arr">↕️</span>
            </div>
            <div class="body hid">
                <p>
                <span>-Local Name : ${r.nativeName}</span>
                <span>Region : ${r.region}</span>
                </p>
                <p>
                <span>-Currency : ${r.currencies[0].code} ${r.currencies[0].symbol}</span>
                <span>Capital : ${r.capital}</span>
                <span>-Time Zone(s) :  ${r.timezones} </span>
                </p>
                <p>
                <span>-Short Names : ${r.alpha2Code}, </span>
                <span>${r.alpha3Code}</span>
                </p>
                <p><span>-Language(s): ${languagesNames}</span>
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