const styles = [
    { property: "color", value: "blue" },
    { property: "font-size", value: "18px" },
    { property: "text-align", value: "center" },
    { property: "text-decoration", value: "underline" }
];

function applyStyles(text, stylesArray) {
    const styleString = stylesArray.map(style => `${style.property}: ${style.value}`).join("; ");
    document.getElementById("output").innerHTML = `<p style="${styleString}">${text}</p>`;
}

document.addEventListener("DOMContentLoaded", () => {
    applyStyles("Hello , це текст з застосованними стилями", styles);
});