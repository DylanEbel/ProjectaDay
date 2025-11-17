export default class Tile {
    x;
    y;
    val;
    #el;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.val = "";

        this.CreateElement()
    }

    CreateElement() {
        this.#el = document.createElement("input") 

        this.#el.maxLength = 1;

        this.#el.id = this.x + "-" + this.y
        this.#el.inputmode = "numeric"
        this.#el.autocomplete = "off"
        this.#el.type = "text"

        this.#el.classList.add("tile")
        if ((this.x + 1) % 3 == 0) {
            this.#el.classList.add("x-end")
        }
        if ((this.y + 1) % 3 == 0) {
            this.#el.classList.add("y-end")
        }

        this.#el.addEventListener("beforeinput", (e) => {
            if (e.inputType === "deleteContentBackward") {
                this.#el.value = "";
                this.val = "";
                return;
            }

            const val = e.data;

            if (/^[1-9]$/.test(val)) {
                this.SetVal(Number(e.data));
            } 
            e.preventDefault()
        })
    }

    GetElement() {
        return this.#el;
    }

    SetVal(val) {
        this.val = val;
        this.#el.value = val;
        return
    }

    SetValZero() {
        this.val = null;
        this.#el.value = "";
        return
    }
}