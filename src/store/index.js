import { proxy } from "valtio";

const state = proxy({
    intro: true,
    color: "#781EDB",
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './x3.png',
    fullDecal: './x3.png',
    cart: false,

})

export default state;